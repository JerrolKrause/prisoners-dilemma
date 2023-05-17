import { environment } from '$env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomService } from '@ntersol/services';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, fromEvent, interval, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { LogoutModalComponent } from '../../components/modals';
import { Models } from '../models/global.models';
import { AppStorageService } from './app-storage.service';

export enum AuthState {
  initial,
  loggedIn,
  loggedOut,
  sessionExpired,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Auth status based on authstate */
  public authState$ = new BehaviorSubject<AuthState>(AuthState.initial);

  /** Holds reference to logout modal */
  public logOutModal: any | null | undefined;

  /** How often to refresh the token after user interaction */
  private tokenRefreshInterval = 60; // In seconds. 60 = 1 minute
  /** How long should the user be idle before loading the modal */
  private idleDuration = 60 * 5; // In seconds 60 * 5 = 5 minutes
  /** How long will the log out modal will display before logging a user out automatically */
  private logoutModalDuration = 60; // In seconds = 1 minute

  /** Is the current timer expired */
  private logoutModalVisible = false;

  /** User interaction events. Watches mouse movement, clicks, scroll and key presses. SSR safe */
  private userActions$ =
    this.dom.isBrowser && this.dom.document
      ? merge(fromEvent(document, 'keypress'), fromEvent(document, 'mousemove'), fromEvent(document, 'click'), fromEvent(this.dom.document, 'scroll'))
      : merge();

  /** Throttle userActions  */
  public refreshEvent$ = this.userActions$.pipe(
    startWith(0),
    throttleTime(1000, undefined, { leading: false, trailing: true }), // Throttle to every one second
  );

  /** Logout timer that resets after every user interaction event */
  public logoutTimerExpired$ = this.refreshEvent$.pipe(
    switchMap(() => interval(1000)), // Reset interval everytime refresh fires
    map(val => (val > this.idleDuration ? true : false)), // If val is greater than duration, convert to true or false
    startWith(false),
    distinctUntilChanged(),
    filter(expired => !!this.appStorage.token && expired && !this.logoutModalVisible), // Don't show if logout modal is already visible or no token
    tap(() => this.launchLogoutModal()),
  );

  /** Refresh the token automatically */
  public refreshToken$ = this.refreshEvent$.pipe(
    // Throttle time using refresh interval
    // Needs to be before filter to prevent duplicate calls when the logout modal fires or on login
    throttleTime(this.tokenRefreshInterval * 1000, undefined, { leading: false, trailing: true }),
    // Token refresh can only occur after refreshEvent$ is initialized
    // Only capture refresh events if token present
    // Only refresh token if timer not expired
    filter(refreshEvent => !!refreshEvent && !!this.appStorage.token && !this.logoutModalVisible),
    tap(() => this.refreshToken()), // Make refresh calls
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private appStorage: AppStorageService,
    public dialogService: DialogService,
    private dom: DomService,
  ) {
    // If a token was passed in via query param
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['token']) {
        this.appStorage.token = params['token'];
      }
    });
  }

  /**
   * Log the user in
   * @param data
   */
  public logIn(data: any) {
    // Determine if valid auth endpoint available. If not use stubbed out one
    const authApi =
      environment.endpoints.apiUrl && environment.endpoints.authLogin
        ? this.http.post<Models.Auth>(environment.endpoints.apiUrl + environment.endpoints.authLogin, data)
        : this.http.get<Models.Auth>('assets/mock-data/login.json');
    return authApi.pipe(
      tap(response => {
        this.appStorage.token = response.data.token;
        this.authState$.next(AuthState.loggedIn);
        // Override default idle duration if specified in the api response
        if (response.data.expirationSeconds) {
          this.idleDuration = response.data.expirationSeconds;
        }
      }),
    );
  } // end LogIn

  /**
   * Refresh the token
   */
  public refreshToken() {
    const authApi =
      environment.endpoints.apiUrl && environment.endpoints.authTokenRefresh
        ? this.http.post<Models.Auth>(environment.endpoints.apiUrl + environment.endpoints.authTokenRefresh, {})
        : // Stub refresh API
          this.http
            .post<Models.Auth>('https://jsonplaceholder.typicode.com/posts/', {})
            .pipe(map(() => ({ data: { token: '12345', userGuid: '12345' }, success: true, meta: {} } as Models.Auth)));

    authApi.subscribe(
      response => {
        if (this.appStorage.token) {
          // Make sure a token is present before it is replaced
          this.authState$.next(AuthState.loggedIn);
          this.appStorage.token = response.data.token;
        }
      },
      () => this.logOut(AuthState.sessionExpired),
    );
    // Return observable if needed by a component
    return authApi;
  } // end RefreshToken

  /**
   * Launch a modal window which gives the user a chance to continue working
   */
  public launchLogoutModal(): void {
    this.logoutModalVisible = true;
    // Open log out modal window
    const ref = this.dialogService.open(LogoutModalComponent, {
      data: this.logoutModalDuration,
      header: 'Warning',
      width: '70%',
      dismissableMask: true,
    });
    // When modal closes
    ref.onClose.subscribe(reason => {
      if (reason) {
        this.logOut(AuthState.loggedOut);
      } else {
        this.refreshToken(); // Immediately refresh token
      }
      this.logoutModalVisible = false;
    });
  }

  /**
   * Log the user out. Clear stored data and redirect to login page
   */
  public logOut(authState: AuthState): void {
    this.appStorage.token = null;
    this.logoutModalVisible = false;
    this.authState$.next(authState);
    // Don't throw a redirect url if this is the dashboard since that is default on login
    const returnUrl = this.router.url !== '/' && this.router.url !== '/login' ? this.router.url.split('?')[0] : null;
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  } // end LogOut
}

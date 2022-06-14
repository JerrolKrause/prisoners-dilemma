import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, UntypedFormBuilder } from '@angular/forms';

import { SettingsService } from '$settings';
import { AuthService, AuthState } from '../../shared/services/auth.service';
import { DomService } from '../../shared/services/dom.service';

// Localstorage key to store username
const savedUserName = 'savedUserName';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public formMain = this.fb.group({
    userName: [null || 'juser', [Validators.required]],
    password: ['password', [Validators.required]],
    remember: [null],
  });
  public waiting: boolean | undefined;
  public errorApi: any | null | undefined;
  public showErrorDetails = false;

  public authState$ = this.authService.authState$;
  public authState = AuthState;

  public loggedout: boolean | undefined;
  public showPassword = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private settings: SettingsService,
    private dom: DomService,
  ) {}

  public ngOnInit() {
    // Is there a saved username
    const remember = this.dom.localStorage?.getItem(savedUserName);
    // If so update the login form
    if (!!remember) {
      this.formMain.patchValue({
        userName: remember,
        remember: true,
      });
    }
    this.authService.logOutModal = null; // Get rid of logout modal if it persists
  }

  /**
   * Submit the form
   */
  public onLogin() {
    this.waiting = true;
    this.errorApi = null;
    this.showErrorDetails = false;

    // If remember username is set, save to localstorage
    if (this.formMain && this.formMain.value.remember) {
      this.dom.localStorage?.setItem(savedUserName, this.formMain.value.userName);
    } else {
      this.dom.localStorage.removeItem(savedUserName);
    }

    // Authenticate
    this.authService.logIn(this.formMain.value).subscribe(
      () => {
        this.settings.userName = this.formMain.value.userName;
        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        this.waiting = false;
      },
      error => {
        error.errorMsg = 'Error logging in.';
        if ((error.statusText = 'Unauthorized')) {
          error.errorMsg = 'Invalid username or password, please try again.';
          this.showErrorDetails = false;
        }

        this.errorApi = error;
        this.waiting = false;
      },
    );
  } // end onSubmit

  ngOnDestroy() {}
}

import { Component, OnDestroy, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AppStorageService, AuthService, AuthState, UiStateService } from '$shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvailableIcons } from '../../icons/icons.component';
interface MainMenuItem {
  label: string;
  icon?: AvailableIcons;
  routerLink?: string;
  routerLinkActiveOptions?: any;
  command?: () => any;
}

@Component({
  selector: 'app-nav',
  styleUrls: ['./nav.component.scss'],
  templateUrl: './nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy {
  /** Turn the username into title case */
  public user$ = this.appStorage.user$;

  public navMenu: MainMenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Users Demo',
      icon: 'users',
      routerLink: '/users',
      routerLinkActiveOptions: { exact: true },
    },
  ];

  public utilityMenu: MainMenuItem[] = [
    {
      label: 'Sign Out',
      icon: 'power-off',
      command: () => this.logOut(),
    },
  ];

  public sidebarVisible = signal(false);

  constructor(private appStorage: AppStorageService, private ui: UiStateService, private router: Router, private auth: AuthService) {
    // On route change, if mobile nav is open close it
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => this.sidebarVisible.set(false));
  }

  ngOnInit(): void {}

  /**
   * Toggle sidebar
   */
  public toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  /**
   * Update application
   */
  public updateApp() {
    this.ui.updateAppModal();
  }

  /**
   * Log out
   */
  public logOut() {
    this.auth.logOut(AuthState.loggedOut);
  }

  ngOnDestroy(): void {}
}

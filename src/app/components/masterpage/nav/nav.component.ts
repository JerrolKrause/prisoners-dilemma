import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService } from '$settings';

import { UiStateService } from '$ui';
import { AuthService, AuthState } from '../../../shared/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MainMenuItem {
  label: string;
  icon?: IconProp;
  routerLink?: string;
  routerLinkActiveOptions?: any;
  command?: () => any;
}

@UntilDestroy()
@Component({
  selector: 'app-nav',
  styleUrls: ['./nav.component.scss'],
  templateUrl: './nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit, OnDestroy {
  /** Turn the username into title case */
  public userName$ = this.settings.userName$;
  /**   Does the app have an update */
  public hasUpdate$ = this.ui.updateAvailable$;

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

  public sidebarVisible = false;
  public dropDownMenuVisible = false;

  constructor(private settings: SettingsService, private ui: UiStateService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // On route change, if mobile nav is open close it
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => (this.sidebarVisible = false));
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

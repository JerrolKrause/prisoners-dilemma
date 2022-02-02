import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SettingsService } from '$settings';

import { MenuItem } from 'primeng/api';
import { UiStateService } from '$ui';
import { AuthService, AuthState } from '../../../shared/services';
import { untilDestroyed } from '@ngneat/until-destroy';

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

  public navMenu: MenuItem[] = [
    {
      label: 'Home',
      expanded: true,
      icon: 'fas fa-home me-1',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Demo Route',
      expanded: true,
      icon: 'fas fa-cubes me-1',
      routerLink: '/route',
    },
  ];

  public utilityMenu: MenuItem[] = [
    {
      label: 'Sign Out',
      icon: 'fas fa-cubes me-1',
      command: () => this.logOut(),
    },
  ];

  public sidebarVisible = false;

  constructor(private auth: AuthService, private settings: SettingsService, private ui: UiStateService, private router: Router) {}

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

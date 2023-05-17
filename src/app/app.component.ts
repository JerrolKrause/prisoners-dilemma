import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomService } from '@ntersol/services';
import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private dom: DomService) {
    // Manage authentication events. These are subscriptions so for memory management reasons they are managed here instead of the service
    if (this.dom.isBrowser) {
      // Handle logout modal
      this.auth.logoutTimerExpired$.pipe(takeUntilDestroyed()).subscribe();
      // Handle refresh token
      this.auth.refreshToken$.pipe(takeUntilDestroyed()).subscribe();
    }
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}

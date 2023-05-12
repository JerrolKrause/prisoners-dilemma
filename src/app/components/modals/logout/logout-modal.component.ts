import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
})
export class LogoutModalComponent implements OnInit, OnDestroy {
  public logoutTimer$ = timer(0, 1000).pipe(map(x => (this.config.data || 60) - x));

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    // Create a timer obserable that counts down
    this.logoutTimer$.pipe(takeUntilDestroyed()).subscribe(timeLeft => {
      // If timer hits zero or below, CLOSE this modal which toggles the logout action in AuthService
      if (timeLeft <= 0) {
        this.logout();
      }
    });
  }

  ngOnInit() {}

  /** Log the user out manually */
  public logout() {
    this.ref.close(true);
  }

  public ngOnDestroy() {}
}

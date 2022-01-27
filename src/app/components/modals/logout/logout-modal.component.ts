import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@UntilDestroy()
@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
})
export class LogoutModalComponent implements OnInit, OnDestroy {
  public logoutTimer$: Subscription | undefined; // Holds the countdown obserable
  public counter: number | undefined; // Log out after this many seconds

  constructor(public dialogService: DialogService, public ref: DynamicDialogRef) {}

  ngOnInit() {
    //  this.counter = this.config.data; // How long to display the modal window

    // Create a timer obserable that counts down
    this.logoutTimer$ = interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        // If timer is greater than 0, count down.
        if (this.counter && this.counter > 1) {
          this.counter--;
        } else {
          // If timer hits zero or below, CLOSE this modal which toggles the logout action in AuthService
          this.logout();
        }
      });
  }

  /** Log the user out manually */
  public logout() {
    this.ref.close(true);
  }

  public ngOnDestroy() {}
}

import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { NtsVersionManagementService } from '../../services';
import { ntsUIStoreCreator } from '@ntersol/state-management';

// Set up interface for the store
interface GlobalUIStoreModel { }

@Injectable({ providedIn: 'root' })
export class UiStateService {

  // Create a ui store creator instance with default state using interface model and options
  public uiStore = ntsUIStoreCreator<GlobalUIStoreModel>({}, { persistId: 'globalUIStore' });

  /** Is an app update available, either from the service worker or the version checker */
  public updateAvailable$ = merge(this.ntsVersion.updateAvailable$);

  constructor(
    private confirmationService: ConfirmationService,
    private ntsVersion: NtsVersionManagementService,
  ) {
    // this.query.uiState$.subscribe(state => console.log('UI STATE', state));
    this.updateAvailable$.pipe(filter(val => val)).subscribe(() => this.updateAppModal());
  }

  public updateAppModal() {
    this.confirmationService.confirm({
      message: 'An update for this application is available, would you like to update?',
      header: 'Confirmation',
      accept: () => document.location.reload(),
      // accept: () => (this.sw.isEnabled ? this.sw.activateUpdate().then(() => document.location.reload()) : document.location.reload()),
      // reject: () => console.log('Nope!!!'),
    });
  }

}

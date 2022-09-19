import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ntsUIStoreCreator } from '@ntersol/state-management';

// Set up interface for the store
interface GlobalUIStoreModel {}

@Injectable({ providedIn: 'root' })
export class UiStateService {
  // Create a ui store creator instance with default state using interface model and options
  public uiStore = ntsUIStoreCreator<GlobalUIStoreModel>({}, { persistId: 'globalUIStore' });

  constructor(private confirmationService: ConfirmationService) {}

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

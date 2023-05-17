import { Injectable } from '@angular/core';
import { DomService } from '@ntersol/services';
import { ntsUIStoreCreator } from '@ntersol/state-management';
import { ConfirmationService } from 'primeng/api';

// Set up interface for the store
interface GlobalUIStoreModel {}

@Injectable({ providedIn: 'root' })
export class UiStateService {
  // Create a ui store creator instance with default state using interface model and options
  public uiStore = ntsUIStoreCreator<GlobalUIStoreModel>({}, { persistId: 'globalUIStore' });

  constructor(private confirmationService: ConfirmationService, private dom: DomService) {}

  public updateAppModal() {
    this.confirmationService.confirm({
      message: 'An update for this application is available, would you like to update?',
      header: 'Confirmation',
      accept: () => this.dom?.document?.location.reload(),
      // accept: () => (this.sw.isEnabled ? this.sw.activateUpdate().then(() => this.dom?.document?.location.reload()) : this.dom?.document?.location.reload()),
      // reject: () => console.log('Nope!!!'),
    });
  }
}

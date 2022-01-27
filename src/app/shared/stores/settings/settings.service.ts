import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ntsUIStoreCreator } from '@ntersol/state-management';

interface SettingsStore {
  token: string | null;
  userName: string | null;
}

const initialState: SettingsStore = {
  token: null,
  userName: null
}

@Injectable({ providedIn: 'root' })
export class SettingsService {

  // Create a ui store creator instance with default state using interface model and options
  private store = ntsUIStoreCreator<SettingsStore>(initialState, { persistId: 'settingsStore' });

  /** Is the browsers available, used for SSR/Angular universal */
  public isBrowser = isPlatformBrowser(this.platformId);

  public token$ = this.store.select$('token');

  public get token() {
    return this.store.state.token;
  }

  public set token(token: string | null) {
    this.store.update({ token: token });
  }

  public userName$ = this.store.select$('userName');

  public get userName() {
    return this.store.state.userName;
  }

  public set userName(userName: string | null) {
    this.store.update({ userName: userName });
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {

  }

}

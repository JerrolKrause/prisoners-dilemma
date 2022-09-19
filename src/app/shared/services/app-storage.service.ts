import { Injectable } from '@angular/core';
import { Models } from '../models';
import { StorageService } from '@ntersol/services';

type LocalStorageKeys = 'token' | 'user';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService extends StorageService<LocalStorageKeys> {
  // Token
  public token$ = this.localStorage.getItem$('token');
  public set token(token: string | null) {
    this.localStorage.setItem('token', token);
  }
  public get token() {
    return this.localStorage.getItem('token');
  }

  // User
  public user$ = this.localStorage.getItem$<Models.User>('user', { isJson: true });
  public get user() {
    return this.localStorage.getItem('user', { isJson: true });
  }
  public set user(user: Models.User | null) {
    this.localStorage.setItem('user', user);
  }

  constructor() {
    super();
  }
}

import { Injectable } from '@angular/core';

import { AuthService, AuthState, AppStorageService } from '$shared';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private appStorage: AppStorageService, private auth: AuthService) {}

  canActivate() {
    // If a token
    if (this.appStorage.token) {
      return true; // logged in and has apiUrl so set true
    }
    this.auth.logOut(AuthState.sessionExpired);
    return false;
  }
}

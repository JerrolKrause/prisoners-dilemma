import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ntsApiStoreCreator } from '@ntersol/state-management';
import { Models } from '../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private store = ntsApiStoreCreator(this.http, { apiUrlBase: 'https://jsonplaceholder.typicode.com' });
  public users = this.store<Models.User>({ apiUrl: '/users', uniqueId: 'id' });

  constructor(public http: HttpClient) {}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ntsApiStoreCreator } from '@ntersol/state-management';
import { Models } from '../../models/global.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private store = ntsApiStoreCreator(this.http);
  public users = this.store<Models.User>({ uniqueId: 'id', apiUrl: '//jsonplaceholder.typicode.com/users' });

  // List all store services here
  constructor(public http: HttpClient) { }

}

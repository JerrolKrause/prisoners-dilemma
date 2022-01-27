import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ntsApiStoreCreator } from '@ntersol/state-management';
// import { environment } from '$env'; // Base api url

/**
 * Route specific api stores
 * By default they are not injected in root since they are only needed by this route
 */
@Injectable()
export class RouteApiService {

    // Create a curried store creator instance with default settings
    private store = ntsApiStoreCreator(this.http, { apiUrlBase: '//jsonplaceholder.typicode.com' });

    // Create an instance of an entity based store
    public users = this.store<any>({ apiUrl: '/users' });

    constructor(public http: HttpClient) { }
}
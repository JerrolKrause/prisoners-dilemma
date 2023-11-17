import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService, AuthState, isNode, AppStorageService } from '$shared';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  /**
   * Append bearer token to auth settings
   * @param settings
   */
  constructor(private appStorage: AppStorageService, private auth: AuthService, private transferState: TransferState) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Handle transfer state between node and the browser
    // If is a browser and the request is GET
    if (!isNode && req.method === 'GET') {
      // Create a state key using the url
      const key = makeStateKey(req.url);
      // Look for a response for that state key in the transfer service
      const response = this.transferState.get(key, null);
      // If found return it from the store instead of making an http call
      if (response) {
        return of(new HttpResponse({ body: response, status: 200 }));
      }
    }

    // Add any custom headers
    const headersObj: Record<string, string> = {};
    // If token present, add bearer token
    if (this.appStorage.token) {
      headersObj['Authorization'] = 'Bearer ' + this.appStorage.token;
    }

    // Create headers element
    const headers = new HttpHeaders(headersObj);

    // Clone request, add headers
    const cloneReq = next.handle(req.clone({ headers }));
    // Return request, handle errors globally here
    return cloneReq.pipe(
      tap(event => {
        // If SSR is on and this is on the server/node and this is a successful get request,
        // store the result in transfer state to pass to the browser
        if (isNode && event instanceof HttpResponse && (event.status === 200 || event.status === 202)) {
          this.transferState.set(makeStateKey(req.url), event.body);
        }
      }),
      catchError(error => {
        // If forbidden error, end session
        if (error.status === 401 || error.status === 403) {
          this.sessionEnd();
        }
        // Catch and rethrow error
        return throwError(error);
      }),
    );
  }

  /**
   * End the user's session based on auth failure
   */
  private sessionEnd() {
    this.auth.logOut(AuthState.sessionExpired);
  }
}

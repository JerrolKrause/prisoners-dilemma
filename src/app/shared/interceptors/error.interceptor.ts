import { ErrorHandler, Injectable } from '@angular/core';

import { environment } from '$env';
import { isBrowser } from '$shared';
import { DomService } from '@ntersol/services';

interface AngularError {
  promise: any;
  rejection: any;
  task: any;
  zone: any;
  message: string;
  stack: string;
  errorMsg?: string;
  status?: number;
}

interface LogError {
  eventTime?: string;
  level?: string;
  class: string;
  message: string;
  exception: string;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dom: DomService) {}

  // Custom error handler for application/angular errors
  // Uses plain JS to eliminate any dependencies that may not be available due to the error
  public handleError(error: AngularError) {
    // If is browser
    // Does not have custom error message
    // Does not have http status field (to ignore http errors)
    if (isBrowser && !error.errorMsg && !error.hasOwnProperty('status') && environment.production) {
      // If error endpoint specified, log errors
      if (environment.endpoints.errorPath) {
        this.logError(error);
      }
      // this.appStorage.error$.next(error.message);
      this.resetState(error);
    }
    // Display error in node
    if (!isBrowser) {
      console.error(error);
    }
    // Now throw the error to the console
    throw error;
  } // end handleError

  /**
   * Reset app state
   * @param error
   */
  private resetState(error: AngularError) {
    if (!isBrowser) {
      return;
    }
    console.error({ error: error });
    // const resetAction = () => {
    this.dom?.localStorage?.clear();
    this.dom?.sessionStorage?.clear();
    // this.dom?.window?.location.href = '/login';
    // };
    // If serviceworker is enabled, remove it first befire executing reset action, otherwise just reset
    // this.sw.isEnabled ? this.sw.remove() : resetAction();
  }

  /**
   * Log the error to an API
   * Use XMLHttpRequest since httpClient may not be available
   */
  private logError(error: AngularError) {
    if (!environment.endpoints.apiUrl || !environment.endpoints.errorPath) {
      return;
    }
    const http = new XMLHttpRequest();
    const url = environment.endpoints.apiUrl + environment.endpoints.errorPath;
    const data: LogError = {
      level: 'Error',
      class: '',
      message: error.message,
      exception: error.stack,
    };
    http.open('POST', url, true);
    // Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    http.send(JSON.stringify(data));
  } // end logError
}

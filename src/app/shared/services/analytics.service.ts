/// <reference types="@types/gtag.js" />
import { Injectable } from '@angular/core';
import { DomService } from '@ntersol/services';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: Gtag.Gtag;
  }
}

/**
 * Google Analytics Wrapper
 *
 * - Adds type safety and Node.js support
 * - Install definitions: `npm install --save-dev @types/gtag.js`
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  /** Google analytics account ID */
  public gaId: string | null = null;
  private loaded = false;

  constructor(private dom: DomService) {}

  /**
   * Load and initialize google analytics dynamically. This can be useful when using different tracking scripts per environment
   *
   * The declaration in the index.html file is preferable
   * ```
   * <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'X-XXXXXXXX');
    </script>
   * ```
   *
   * @param gaId
   */
  public load(gaId: string) {
    if (!this.dom.window || this.loaded) {
      return;
    }
    this.gaId = gaId;
    // Initial default global props just in case they were not declared in the root index file
    this.dom.window.dataLayer = this.dom?.window?.dataLayer || [];
    if (!this.dom.window.gtag) {
      this.dom.window.gtag = () => this.dom?.window?.dataLayer.push(arguments);
    }

    this.gtag('js', new Date());
    this.gtag('config', gaId);
    // Load script asynchronously
    if (this.dom.document) {
      const scriptGa = this.dom.document.createElement('script');
      scriptGa.type = 'text/javascript';
      scriptGa.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      scriptGa.onload = () => (this.loaded = true);
      this.dom.document?.head.appendChild(scriptGa);
    }
  }

  /**
   * Pass data to google analytics
   * - https://developers.google.com/tag-platform/gtagjs/reference#event
   * - https://developers.google.com/analytics/devguides/collection/gtagjs/events
   *
   * @example
   * this.analytics.gtag('event', 'sign_up');
   *
   * @param args
   * @returns
   */
  public gtag(command: 'config', targetId: string, config?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams | Gtag.CustomParams): void;
  public gtag(command: 'set', targetId: string, config: Gtag.CustomParams | boolean | string): void;
  public gtag(command: 'set', config: Gtag.CustomParams): void;
  public gtag(command: 'js', config: Date): void;
  public gtag(command: 'event', eventName: Gtag.EventNames | (string & {}), eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams): void;
  public gtag(command: 'get', targetId: string, fieldName: Gtag.FieldNames | string, callback?: (field: string | Gtag.CustomParams | undefined) => any): void;
  public gtag(command: 'consent', consentArg: Gtag.ConsentArg | string, consentParams: Gtag.ConsentParams): void;
  public gtag(arg: any, arg2: any, arg3?: any) {
    this.dom?.window?.gtag(arg, arg2, arg3);
  }

  /**
   * Identify the user to GA with unique ID. Typically done on login or registration events.
   *
   * Do not use any personally identifiable user information like email or phone number
   *
   * @example
   * this.analytics.identify('XXXXX-XXXXX-XXXXX-XXXXX');
   *
   * @param uniqueId
   */
  public identify(uniqueId: string | number | null) {
    this.gtag('set', {
      user_id: uniqueId,
    });
  }
}

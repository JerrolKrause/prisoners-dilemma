import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { debounceTime, filter, map, mergeMap } from 'rxjs/operators';

declare var dataLayer: any;

declare global {
  interface Window {
    dataLayer: any;
    gtag: any;
    ga: any;
  }
}
export interface GAData {
  hitType: string;
  eventCategory?: string,
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
};
// SSR Checks
export const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
export const isBrowser = !isNode;

// https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
// https://www.bounteous.com/insights/2018/03/30/single-page-applications-google-analytics/
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  /** Google analytics account ID */
  private gaId = '';
  private loaded = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(r => {
          while (r.firstChild) {
            r = r.firstChild;
          }
          return r;
        }),
        filter(r => r.outlet === 'primary'),
        mergeMap(r => r.data), // Extract data from the route file if additional metadata is required
        debounceTime(1), // Add a delay to allow any other changes to meta to propagate first
        // filter(d => !!d.disableAutoTrack),
      ) // Pass user's current url to GA on route change
      .subscribe(() => this.trackPageViewGA());
  }

  /**
   * Load a script
   * @param url
   * @param callback
   */
  public start(gaId: string) {
    if (!isBrowser) {
      return;
    }

    // If GA
    if (gaId) {
      this.gaId = gaId;
      this.loadGA(gaId);
    }
  }

  /**
   * Track an event
   * @param eventName
   * @param data
   */
  public trackEventGA(eventName = 'pageview', data: GAData) {
    if (!isBrowser || !this.loaded) {
      return;
    }

    if (!this.gaId) {
      console.error('Missing Google Analytics account ID');
      return;
    }

    if (!!window.ga) {
      window.ga('send', data);
    } else if (!!window.gtag) {
      window.gtag.push({ event: eventName });
      window.gtag('config', this.gaId, { send_page_view: false });
      window.gtag('event', event, {
        send_to: this.gaId,
      });
    } else if (!!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({ event: eventName });
    }
  }

  /**
   * Send a pageview to GA
   * @param pageUrl
   */
  public trackPageViewGA(pageUrl = window.location.pathname + window.location.hash + window.location.search) {
    if (!isBrowser || !this.loaded) {
      return;
    }

    if (!this.gaId) {
      console.error('Missing Google Analytics account ID');
      return;
    }
    // Remove any hash fragment for consistentcy
    pageUrl = pageUrl.replace(/\/#\//gi, '/');
    // console.warn('trackPageViewGA', pageUrl);
    if (!!window.ga) {
      window.ga('set', 'page', pageUrl);
      window.ga('send', 'pageview');
    } else if (!!window.gtag) {
      window.gtag('config', this.gaId, {
        page_path: pageUrl,
      });
    } else if (!!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'pageview',
        page: {
          url: pageUrl,
        },
      });
    }
  }

  /**
   * Identify the user to GA, needs unique ID
   * @param uniqueId
   */
  public identifyGA(uniqueId: string | null) {
    if (!isBrowser || !uniqueId) {
      return;
    }
    // GA identify
    if (!!window?.ga) {
      window.ga('set', 'userId', uniqueId);
      window.ga('set', '&uid', uniqueId);
    }
    // Gtag
    if (!!window?.gtag) {
      window.gtag('set', 'userId', uniqueId);
      window.gtag('set', '&uid', uniqueId);
    }
    // gtm
    if (!!dataLayer) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'login',
        userId: uniqueId,
        '&uid': uniqueId,
      });
    }
  }

  /**
   * Load and initialize google analytics, set account ID
   * @param gaId
   */
  private loadGA(gaId: string) {
    if (!isBrowser) {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    (gtag as any)('js', new Date());
    (gtag as any)('config', this.gaId);
    (gtag as any)('config', this.gaId);
    // Script loaded in index.html
    // Load GA script
    const scriptGa = document.createElement('script');
    scriptGa.type = 'text/javascript';
    scriptGa.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    scriptGa.onload = () => this.gaLoaded();
    document.head.appendChild(scriptGa);
  }

  /**
   * Check if GA of GTAG is loaded. If not poll for updates. GA scripts are loaded from GTM so there's no callback function
   */
  private gaLoaded() {
    if (!!window.ga) {
      this.loaded = true;
      window.ga('create', this.gaId);
    } else if (!!window?.gtag) {
      this.loaded = true;
    } else {
      setTimeout(() => this.gaLoaded(), 100);
    }
  }
}

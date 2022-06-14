// @angular modules
import { SiteModule } from '$site';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, ErrorHandler, Injector, NgModule } from '@angular/core'; // APP_INITIALIZER,
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Main entrypoint component
import { AppComponent } from './app.component';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { GlobalErrorHandler } from './shared/interceptors/error.interceptor';
import { HttpInterceptorService } from './shared/interceptors/http.interceptor';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { isBrowser } from './shared/services';
import { UrlSerializer } from '@angular/router';
import { environment } from '$env';
import { TrailingSlashUrlSerializer } from './shared/utils/url-serializer.util';
import { AppRouterModule } from './app.routes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Enables faster prod mode, does disable some dirty error checking though
if (environment.production) {
  enableProdMode();
}

// Components
export const APP_COMPONENTS = [
  // App component
  AppComponent,
  NoContentComponent,
];

// Scully is not node compatible, only load Scully when not on node
let Scully = [
  ScullyLibModule.forRoot({
    useTransferState: true,
    alwaysMonitor: true,
  }),
];
if (!isBrowser) {
  Scully = [];
}

export let InjectorInstance: Injector;

@NgModule({
    declarations: [APP_COMPONENTS],
    imports: [
        BrowserModule.withServerTransition({ appId: environment.appID }),
        BrowserTransferStateModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRouterModule,
        /** Uncomment to enable SW
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.settings.enableServiceWorker,
          registrationStrategy: 'registerImmediately',
        }),
         */
        SiteModule,
        ...Scully,
    ],
    providers: [
        { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
        // AppConfigService, // App config/env settings
        // Global error handling
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
        // HTTP interceptor for auth
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
        // App initializer for startup
        // {
        //  provide: APP_INITIALIZER,
        //  useFactory: AppInit,
        //  deps: [AppSettings, AppConfigService],
        //  multi: true,
        // },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}

/**
 * Check if environment settings are already present, if not load first before the rest of the app
 * @param settings - App settings
 * @param config - Config service

 export function AppInit(settings: AppSettings, config: AppConfigService): () => Promise<any> {
  if (settings.apiUrl) {
    return (): Promise<any> => new Promise(resolve => resolve());
  } else {
    return (): Promise<any> => config.loadEnvSettings(environment.endpoints.envConfig);
  }
 }
 */

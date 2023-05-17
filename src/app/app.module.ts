// @angular modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule, enableProdMode } from '@angular/core'; // APP_INITIALIZER,
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Uncomment for animation, needed by some prime components
import { UrlSerializer } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
// Main entrypoint component
import { environment } from '$env';
import { GlobalErrorHandler, HttpInterceptorService, TrailingSlashUrlSerializer } from '$shared';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routes.module';
import { ComponentsLazyLoad } from './components/components.lazy';

// Enables faster prod mode, does disable some dirty error checking though
if (environment.production) {
  enableProdMode();
}

// Components
export const APP_COMPONENTS = [
  // App component
  AppComponent,
];

export let InjectorInstance: Injector;

@NgModule({
  declarations: [APP_COMPONENTS],
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appID }),

    HttpClientModule,
    BrowserAnimationsModule, // Uncomment for animation, needed by some prime components
    ComponentsLazyLoad, // Lazy loaded modules on the global scope
    AppRouterModule, // App top level routing

    /** Uncomment to enable SW
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.settings.enableServiceWorker,
          registrationStrategy: 'registerImmediately',
        }),
         */
  ],
  providers: [
    provideClientHydration(), // SSR Hydration
    ConfirmationService,
    DialogService,
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
  bootstrap: [AppComponent],
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

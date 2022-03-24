// @angular modules
import { SiteModule } from '$site';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule } from '@angular/core'; // APP_INITIALIZER,
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Main entrypoint component
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routes.module';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { GlobalErrorHandler } from './shared/interceptors/error.interceptor';
import { HttpInterceptorService } from './shared/interceptors/http.interceptor';

// Enables faster prod mode, does disable some dirty error checking though
// enableProdMode();

// Components
export const APP_COMPONENTS = [
  // App component
  AppComponent,
  NoContentComponent,
];

export let InjectorInstance: Injector;

@NgModule({
  declarations: [APP_COMPONENTS],
  imports: [
    BrowserModule.withServerTransition({ appId: 'angular-starter' }),
    HttpClientModule,
    // BrowserAnimationsModule,
    AppRouterModule,

    /** Uncomment to enable SW
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.settings.enableServiceWorker,
      registrationStrategy: 'registerImmediately',
    }),
     */

    SiteModule,
  ],
  providers: [
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
  entryComponents: [],
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

import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyPlatformServerModule } from '@scullyio/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

enableProdMode();

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppModule, ScullyPlatformServerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppSPSModule {}

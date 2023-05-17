import { IconsComponent, MasterPageModule } from '$components';
import { SharedModule } from '$shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Routing
import { routing } from './home.routes';

// Components
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing, MasterPageModule, IconsComponent],
  declarations: [HomeComponent],
  providers: [],
  exports: [],
})
export class HomeModule {}

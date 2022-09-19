import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '$shared';
import { IconsModule, MasterPageModule } from '$components';
// Routing
import { routing } from './home.routes';

// Components
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing, MasterPageModule, IconsModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [],
})
export class HomeModule {}

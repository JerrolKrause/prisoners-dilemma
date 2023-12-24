import { IconsComponent, MasterPageModule } from '$components';
import { SharedModule } from '$shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Routing
import { routing } from './home.routes';

import { AccordionModule } from 'primeng/accordion';

// Components
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing, MasterPageModule, IconsComponent, ReactiveFormsModule, AccordionModule],
  declarations: [HomeComponent],
  providers: [],
  exports: [],
})
export class HomeModule {}

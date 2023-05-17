import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '$shared';
import { FeedbackModalComponent, LogoutModalComponent } from '../modals';
import { FooterComponent, HeaderComponent, LayoutSingleComponent, MasterpageComponent, NavComponent } from './';

import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { IconsComponent } from '../icons/icons.component';

// Modals include
const APP_MODALS = [LogoutModalComponent, FeedbackModalComponent];

// Components to include
export const APP_COMPONENTS = [...APP_MODALS, FooterComponent, HeaderComponent, MasterpageComponent, LayoutSingleComponent, NavComponent];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Shared
    SharedModule,
    SidebarModule,
    IconsComponent,
  ],
  providers: [ConfirmationService],
  declarations: [APP_COMPONENTS],
  exports: [APP_COMPONENTS],
})
export class MasterPageModule {}

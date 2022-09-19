import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '$shared';
import { LogoutModalComponent, FeedbackModalComponent } from '../modals';
import { FooterComponent, HeaderComponent, MasterpageComponent, NavComponent, LayoutSingleComponent } from './';

import { SidebarModule } from 'primeng/sidebar';
import { ConfirmationService } from 'primeng/api';
import { IconsModule } from '../icons/icons.module';

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
    IconsModule,
  ],
  providers: [ConfirmationService],
  declarations: [APP_COMPONENTS],
  exports: [APP_COMPONENTS],
})
export class MasterPageModule {}

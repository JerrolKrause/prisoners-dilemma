import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { IconsModule } from './shared/icons/icons.module';
import { FontsModule } from './shared/fonts/fonts.module';

const MODULES = [
  // Angular
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  // Font-awesome icons
  FontsModule,
  // Prime NG UI Lib
  SlideMenuModule,
  MenubarModule,
  MenuModule,
  SidebarModule,
  DialogModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  OverlayPanelModule,
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  providers: [ConfirmationService, DialogService],
  exports: MODULES,
  declarations: [],
})
export class VendorModule {}

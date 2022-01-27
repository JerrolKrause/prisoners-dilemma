import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

const modules = [
  // Prime NG UI Lib
  SlideMenuModule,
  MenubarModule,
  MenuModule,
  SidebarModule,
  DialogModule,
  ConfirmDialogModule,
  DynamicDialogModule,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...modules,
  ],
  providers: [ConfirmationService, DialogService],
  exports: [RouterModule, FormsModule, ReactiveFormsModule, ...modules],
  declarations: [],
})
export class VendorModule {}

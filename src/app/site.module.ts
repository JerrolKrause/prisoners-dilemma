import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { VendorModule } from './vendor.module';

@NgModule({
  imports: [
    CommonModule,
    // Vendor components
    VendorModule,
    // Global components
    ComponentsModule,
    // Global shared
    SharedModule,
  ],
  declarations: [],
  exports: [VendorModule, SharedModule, ComponentsModule],
})
export class SiteModule {}

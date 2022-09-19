import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '$shared';
import { IconsModule, MasterPageModule } from '$components';
import { NoContentComponent } from './no-content.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home';

export const routing: ModuleWithProviders<HomeModule> = RouterModule.forChild([
  {
    path: '',
    component: NoContentComponent,
  },
]);

@NgModule({
  imports: [CommonModule, SharedModule, MasterPageModule, IconsModule, routing],
  declarations: [NoContentComponent],
  providers: [],
  exports: [],
})
export class NoContentModule {}

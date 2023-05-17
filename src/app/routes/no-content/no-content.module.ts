import { IconsComponent, MasterPageModule } from '$components';
import { SharedModule } from '$shared';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home';
import { NoContentComponent } from './no-content.component';

export const routing: ModuleWithProviders<HomeModule> = RouterModule.forChild([
  {
    path: '',
    component: NoContentComponent,
  },
]);

@NgModule({
  imports: [CommonModule, SharedModule, MasterPageModule, IconsComponent, routing],
  declarations: [NoContentComponent],
  providers: [],
  exports: [],
})
export class NoContentModule {}

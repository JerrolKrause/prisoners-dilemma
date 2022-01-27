import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteComponent } from './_route.component';
import { RouteModule } from './route.module';

const routes: Routes = [
  {
    path: '',
    component: RouteComponent,
    data: { title: 'Root' },
  },
];

export const routing: ModuleWithProviders<RouteModule> = RouterModule.forChild(routes);

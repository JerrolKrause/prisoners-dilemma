import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { titleAppendSlug } from '$shared';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: titleAppendSlug('Home'),
  },
];

export const routing: ModuleWithProviders<HomeModule> = RouterModule.forChild(routes);

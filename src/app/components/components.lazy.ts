import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // App global components
  {
    path: '~',
    loadChildren: () => import('./masterpage/masterpage.module').then(m => m.MasterPageModule),
  },
  {
    path: '~',
    loadChildren: () => import('./icons/icons.component').then(m => m.IconsComponent),
  },
  // Angular libs
  {
    path: '~',
    loadChildren: () => import('@angular/forms').then(m => m.FormsModule),
  },
  {
    path: '~',
    loadChildren: () => import('@angular/forms').then(m => m.ReactiveFormsModule),
  },
  // Prime libs
  {
    path: '~',
    loadChildren: () => import('primeng/card').then(m => m.CardModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/messages').then(m => m.MessagesModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/table').then(m => m.TableModule),
  },
  {
    path: '~',
    loadChildren: () => import('primeng/tree').then(m => m.TreeModule),
  },
];

export const ComponentsLazyLoad = RouterModule.forChild(routes);

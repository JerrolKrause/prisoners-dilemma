import { Routes } from '@angular/router';
import { LayoutMainComponent } from './components/masterpage';
import { NoContentComponent } from './routes/no-content/no-content.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const ROUTES: Routes = [
  // Routes without masterpage or that do not need to be authenticated need to go first

  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule),
    data: { title: 'Please Log In' },
  },

  // Example route param
  // {
  //  path: 'loan/:LNKey',
  //  component: HomeComponent,
  //  data: { title: 'Dashboard'},
  //  canActivate: [AuthGuard],
  // },

  // Routes that use masterpage go here
  // canActivate with AuthGuard determines if this is an authenticated only route
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      // Homepage non-lazy load implementation
      // {
      //  path: '',
      //  component: HomeComponent,
      //  data: { title: 'Dashboard' },
      //  canActivate: [AuthGuard]
      // },

      // Example for lazy loaded module with route params
      // { path: 'users/:empowerGuid', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },
      // { path: 'users', loadChildren: './routes/users/users.module#UsersModule', canActivate: [AuthGuard] },

      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      {
        path: 'route',
        pathMatch: 'full',
        loadChildren: () => import('./routes/_route/route.module').then(m => m.RouteModule),
        canActivate: [AuthGuard],
      },

      // Empty path string for homepage ('') needs to be LAST otherwise it catches all other routes
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
      },

      {
        path: '**',
        component: NoContentComponent,
        data: { title: 'Page Not Found' },
        canActivate: [AuthGuard],
      },
    ],
  },
];

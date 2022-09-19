import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './routes/user/user.component';
import { UsersComponent } from './users.component';
import { UsersModule } from './users.module';
import { titleAppendSlug } from '$shared';

const routes: Routes = [
  {
    path: ':userId',
    component: UserComponent,
    title: titleAppendSlug('Modify User'),
  },
  {
    path: '',
    component: UsersComponent,
    title: titleAppendSlug('Users'),
  },
];

export const UsersRouting: ModuleWithProviders<UsersModule> = RouterModule.forChild(routes);

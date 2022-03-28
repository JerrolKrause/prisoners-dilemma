import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './routes/user/user.component';
import { UsersComponent } from './users.component';
import { UsersModule } from './users.module';

const routes: Routes = [
  {
    path: ':userId',
    component: UserComponent,
    data: { title: 'Users' },
  },
  {
    path: '',
    component: UsersComponent,
    data: { title: 'Users' },
  },
];

export const UsersRouting: ModuleWithProviders<UsersModule> = RouterModule.forChild(routes);

import { IconsComponent, MasterPageModule } from '$components';
import { SharedModule } from '$shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NtsStateManagementModule } from '@ntersol/state-management';
import { InputTextModule } from 'primeng/inputtext';
import { UserComponent } from './routes/user/user.component';
import { UsersRouting } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MasterPageModule,
    IconsComponent,
    UsersRouting,
    NtsStateManagementModule,
    InputTextModule,
  ],
  declarations: [UsersComponent, UserComponent],
})
export class UsersModule {}

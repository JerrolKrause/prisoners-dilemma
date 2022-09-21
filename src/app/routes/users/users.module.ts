import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from '$shared';
import { UsersRouting } from './users-routing.module';
import { UserComponent } from './routes/user/user.component';
import { NtsStateManagementModule } from '@ntersol/state-management';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule, MasterPageModule } from '$components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MasterPageModule,
    IconsModule,
    UsersRouting,
    NtsStateManagementModule,
    InputTextModule,
  ],
  declarations: [UsersComponent, UserComponent],
})
export class UsersModule {}

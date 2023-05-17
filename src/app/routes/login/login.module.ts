import { IconsComponent, MasterPageModule } from '$components';
import { SharedModule } from '$shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { LoginComponent } from './login.component';
import { routing } from './login.routes';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, CardModule, MessageModule, routing, MasterPageModule, IconsComponent],
  declarations: [LoginComponent],
  providers: [],
  exports: [],
})
export class LoginModule {}

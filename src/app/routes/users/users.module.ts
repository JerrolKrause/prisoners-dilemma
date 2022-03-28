import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SiteModule } from '$site';
import { UsersRouting } from './users-routing.module';
import { UserComponent } from './routes/user/user.component';
import { NtsStateManagementModule } from '@ntersol/state-management';
import { NtsFormsModule } from '@ntersol/forms';

@NgModule({
  imports: [CommonModule, SiteModule, UsersRouting, NtsStateManagementModule, NtsFormsModule],
  declarations: [UsersComponent, UserComponent],
})
export class UsersModule {}

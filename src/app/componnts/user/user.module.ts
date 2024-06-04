import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './list/user-list.component';
import { EditUserComponent } from './edit/user-edit.component';
import { UserRolesComponent } from './roles/user-roles.component';
import { UserSettingsComponent } from './settings/user-settings.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'roles', component: UserRolesComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: '**', redirectTo: 'edit' },
];

@NgModule({
  imports: [
    UserListComponent,
    EditUserComponent,
    UserRolesComponent,
    UserSettingsComponent,
    RouterModule.forChild(routes),
  ],
})
export class UserModule {}

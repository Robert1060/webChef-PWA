import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

interface UsersListItem {
  url: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    CommonModule,
    MatExpansionModule,
    MatListModule,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {
  protected currentDate = new Date();

  readonly userListItems: UsersListItem[] = [
    {
      title: 'User List',
      icon: 'group',
      url: 'list',
    },
    {
      title: 'User Edit',
      icon: 'edit',
      url: 'edit',
    },
    {
      title: 'Roles and Permissions',
      icon: 'key',
      url: 'roles',
    },
    {
      title: 'Settings',
      icon: 'settings',
      url: 'settings',
    },
  ];
}

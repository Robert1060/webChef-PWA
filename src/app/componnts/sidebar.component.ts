import { Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

interface UsersListItem {
  url: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
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
  template: `
    <mat-sidenav-container class="h-screen" hasBackdrop>
      <mat-sidenav
        #sidenav
        mode="side"
        style="width: 315px;"
        class=" bg-gray-800 text-white"
      >
        <button
          mat-icon-button
          (click)="sidenav.close()"
          class="absolute top-4 left-4"
        >
          <mat-icon>close</mat-icon>
        </button>
        <div class="mt-8">
          <mat-action-list>
            <mat-list-item role="listitem" class="flex items-center">
              <mat-icon>help</mat-icon>
              <span>Support</span>
            </mat-list-item>
          </mat-action-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="flex flex-col h-screen">
          <div class="flex h-full">
            @if (!sidenav.opened) {
            <div class="border-r" style="width: 315px">
              <div class="p-4 mb-6">
                <button
                  mat-icon-button
                  (click)="sidenav.open()"
                  *ngIf="!sidenav.opened"
                  class="mr-4"
                >
                  <mat-icon>menu</mat-icon>
                </button>
                <div class="mt-10">
                  <p class="text-gray-500 m-0">
                    {{ currentDate | date : 'EEEE' }}
                  </p>
                  <p class="text-xl m-0">
                    {{ currentDate | date : 'd' }}
                    {{ currentDate | date : 'MMMM' }}
                  </p>
                  <p class="text-gray-500">{{ currentDate | date : 'yyyy' }}</p>
                  <mat-divider></mat-divider>
                </div>
              </div>
              <mat-accordion>
                <mat-expansion-panel hideToggle>
                  <mat-expansion-panel-header>
                    <mat-panel-title class="flex items-center">
                      <mat-icon class="mr-4">analytics</mat-icon>
                      <span>Statistics</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  statistic info here
                </mat-expansion-panel>
                <mat-expansion-panel hideToggle>
                  <mat-expansion-panel-header>
                    <mat-panel-title class="flex items-center">
                      <mat-icon class="mr-4">group</mat-icon>
                      <span>Users</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>
                  <mat-list role="list">
                    @for (item of userListItems; track $index) {
                    <mat-list-item>
                      <button
                        class="flex items-center"
                        [routerLink]="['/user', item.url]"
                      >
                        <mat-icon class="mr-2">{{ item.icon }}</mat-icon>
                        <span>{{ item.title }}</span>
                      </button>
                    </mat-list-item>
                    }
                  </mat-list>
                </mat-expansion-panel>
              </mat-accordion>
            </div>
            }
            <div class="flex w-full flex-col">
              <app-navbar></app-navbar>
              <div class="flex-grow">
                <router-outlet></router-outlet>
              </div>
            </div>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
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

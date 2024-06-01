import { Component, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

interface SampleData {
  title: string;
  quantity: number;
}

interface SampleNotification {
  icon: string;
  description: string;
  link: string;
  tooltip: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    RouterModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  template: `
    <nav class="h-20 items-center shadow-md">
      <div class="w-full flex justify-between h-full pr-4">
        <div class="flex">
          @for(item of dataInternal; track $index) {
          <div class="border-r flex flex-col items-center justify-center px-3">
            <span class="uppercase gray-text">{{ item.title }}</span>
            <span>{{ item.quantity }}</span>
          </div>
          }
        </div>
        <div class="flex">
          <div class="border-l h-full flex items-center px-5">
            <button mat-icon-button [matMenuTriggerFor]="notificationsMenu">
              <mat-icon
                [matBadge]="sampleNotifications.length"
                matBadgeColor="accent"
                >notifications</mat-icon
              >
            </button>
            <mat-menu #notificationsMenu="matMenu">
              @for(notification of sampleNotifications; track $index) {
              <button
                mat-menu-item
                [routerLink]="'user/' + notification.link"
                [matTooltip]="notification.tooltip"
              >
                <mat-icon>{{ notification.icon }}</mat-icon>
                <span>{{ notification.description }}</span>
              </button>
              }
            </mat-menu>
          </div>
          <div class="border-l h-full flex items-center px-4">
            <img src="https://picsum.photos/id/237/35/35?grayscale" />
            <button [matMenuTriggerFor]="userMenu" class="flex justify-center">
              <div class="px-4">Warsztat 4322</div>
              <mat-icon>arrow_drop_down</mat-icon>
            </button>
            <mat-menu #userMenu class="mt-3">
              <button mat-menu-item>
                <mat-icon>menu</mat-icon>
                foo
              </button>
            </mat-menu>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  protected readonly dataInternal: SampleData[] = [
    {
      title: 'zlecenia',
      quantity: 255,
    },
    {
      title: 'depozyty',
      quantity: 255,
    },
    {
      title: 'zamówienia',
      quantity: 255,
    },
  ];

  protected readonly sampleNotifications: SampleNotification[] = [
    {
      icon: 'settings',
      description: 'update settings',
      link: 'settings',
      tooltip: 'more detailet description here',
    },
    {
      icon: 'edit',
      description: 'new options available!',
      link: 'edit',
      tooltip: 'more detailet description here',
    },
    {
      icon: 'key',
      description: 'update roles',
      link: 'roles',
      tooltip: 'more detailet description here',
    },
  ];
}

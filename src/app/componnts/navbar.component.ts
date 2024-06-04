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
  templateUrl: './navbar.component.html',
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

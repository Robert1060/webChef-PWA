import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DeleteBtnComponent } from '../buttons/custom-btn.component';
import { FormBuilder } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, MatButtonModule, DeleteBtnComponent, MatTabsModule],
  template: `
    <div class="m-4 p-4 w-full">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-2">
          <div class="capitalize">user / {{ routeUrl() }}</div>
          <h1>Hugh Jackman</h1>
        </div>
        <div class="flex gap-4">
          <app-custom-btn color="#E5322C" btnName="delete"></app-custom-btn>
          <app-custom-btn color="#FABB2B" btnName="block"></app-custom-btn
          ><app-custom-btn
            color="#6E7C98"
            btnName="set password"
          ></app-custom-btn
          ><app-custom-btn color="#5E92FC" btnName="save"></app-custom-btn>
        </div>
      </div>
      <div class="flex w-full gap-4 mt-4" style="height: calc(100% - 80px);">
        <mat-tab-group
          class="w-3/5 border"
          mat-stretch-tabs="false"
          mat-align-tabs="start"
        >
          <mat-tab label="Logs">
            <div class="p-4">logs content goes here</div>
          </mat-tab>
          <mat-tab label="Permissions"> Permissions </mat-tab>
        </mat-tab-group>
        <mat-tab-group
          class="w-2/5 border"
          mat-stretch-tabs="false"
          mat-align-tabs="start"
        >
          <mat-tab label="Links"> Links </mat-tab>
          <mat-tab label="History"> History </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [
    `
      .test {
        background-color: var(--button-color);
      }
    `,
  ],
})
export class EditUserComponent {
  protected readonly routeUrl = signal<string>('');

  //   fg = this.fb.group({
  //     email: ['', []],
  //   });

  @HostBinding('class.h-full')
  @HostBinding('class.flex')
  get adjustHeightAndDisplay() {
    return true;
  }

  constructor(route: ActivatedRoute, private fb: FormBuilder) {
    this.routeUrl.set(route.snapshot.url[0].path);
  }
}

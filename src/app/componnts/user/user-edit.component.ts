import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DeleteBtnComponent } from '../buttons/custom-btn.component';
import { FormBuilder } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Action } from '@ngrx/store';
import {
  attemptToBlockUser,
  deleteUser,
  setPassword,
} from '../../store/user/user.actions';

interface ActionCustomBtn {
  type: 'action';
  color: string;
  name: string;
  action: (prop: string) => Action;
}
interface SubmitCustomBtn {
  type: 'submit';
  color: string;
  name: string;
  formGroup: any; //maybe change later
}

type CustomBtn = ActionCustomBtn | SubmitCustomBtn;

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
          @for(btn of customButtonsInternal; track $index) { @switch (btn.type)
          { @case ('action') {
          <app-custom-btn
            [color]="btn.color"
            [btnName]="btn.name"
            [actionToDispatch]="btn.action('')"
          ></app-custom-btn>
          } @case ('submit') {
          <app-custom-btn
            [color]="btn.color"
            [btnName]="btn.name"
            [fg]="btn.formGroup"
          ></app-custom-btn>
          } } }
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

  readonly customButtonsInternal: CustomBtn[] = [
    {
      type: 'action',
      color: '#E5322C',
      name: 'delete',
      action: (id) => deleteUser({ id }),
    },
    {
      type: 'action',
      color: '#FABB2B',
      name: 'block',
      action: (id) => attemptToBlockUser({ id }),
    },
    {
      type: 'action',
      color: '#6E7C98',
      name: 'set password',
      action: (id) => setPassword({ id }),
    },
    {
      type: 'submit',
      color: '#5E92FC',
      name: 'save',
      formGroup: null as any,
    },
  ];

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

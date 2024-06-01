import { Component, HostBinding, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Action } from '@ngrx/store';

@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [],
  styles: [
    `
      button {
        background-color: var(--button-color);
      }
    `,
  ],
  template: `
    <button
      class="p-3 rounded-md uppercase"
      (click)="actionToDispach() ? action() : submit()"
    >
      {{ btnName() }}
    </button>
  `,
})
export class DeleteBtnComponent {
  color = input.required<string>();
  btnName = input.required<string>();
  actionToDispach = input<Action>();

  fg = input<FormGroup>();

  submit() {
    console.log(this.fg()?.value);
  }

  action() {}

  @HostBinding('style.--button-color')
  get buttonColor(): string {
    return this.color();
  }
}

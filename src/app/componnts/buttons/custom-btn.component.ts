import { Component, HostBinding, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action, Store } from '@ngrx/store';

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
      (click)="
        actionToDispatch() ? dispatchAction(actionToDispatch()) : submit()
      "
    >
      {{ btnName() }}
    </button>
  `,
})
export class DeleteBtnComponent {
  constructor(private store: Store) {}

  color = input.required<string>();
  btnName = input.required<string>();

  actionToDispatch = input<Action>();
  fg = input<FormGroup>();

  submit() {
    console.log(this.fg()?.value);
  }

  dispatchAction(action?: Action) {
    if (action) this.store.dispatch(action);
  }

  @HostBinding('style.--button-color')
  get buttonColor(): string {
    return this.color();
  }
}

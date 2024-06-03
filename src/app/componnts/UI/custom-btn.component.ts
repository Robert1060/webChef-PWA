import { Component, HostBinding, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Action, Store } from '@ngrx/store';
import { EditUserState } from '../user/user.models';
import { submtiEditUserState } from '../../store/user/user.actions';

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
    const form = this.fg();
    if (form?.valid && this.isUserState(form.value)) {
      this.store.dispatch(submtiEditUserState(form.value));
    } else {
      form?.markAllAsTouched();
    }
  }

  isUserState(data: any): data is EditUserState {
    // that's just ugly type check, to chage in future
    return data.firstName && data.lastName;
  }

  dispatchAction(action?: Action) {
    if (action) this.store.dispatch(action);
  }

  @HostBinding('style.--button-color')
  get buttonColor(): string {
    return this.color();
  }
}

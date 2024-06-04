import { Component, HostBinding, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
      class="p-3 custom-btn"
      (click)="
        actionToDispatch() ? dispatchAction(actionToDispatch()) : submitForm()
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

  protected submitForm() {
    const form = this.fg();
    if (form?.valid && this.isUserState(form.value)) {
      console.log(form.value);
      this.store.dispatch(submtiEditUserState(form.value));
    } else {
      form?.markAllAsTouched();
    }
  }

  private isUserState(data: any): data is EditUserState {
    // that's just ugly type check, to chage in future
    return data.firstName && data.lastName;
  }

  protected dispatchAction(action?: Action) {
    if (action) this.store.dispatch(action);
  }

  @HostBinding('style.--button-color')
  get buttonColor(): string {
    return this.color();
  }
}

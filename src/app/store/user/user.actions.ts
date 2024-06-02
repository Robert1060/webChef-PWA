import { createAction, props } from '@ngrx/store';
import { Role } from './user.reducer';

export const submitUserRole = createAction(
  '[User] Submit user role',
  props<{ role: Role }>()
);

import { createAction, props } from '@ngrx/store';
import { Role } from '../../componnts/user/user.models';

export const submitUserRole = createAction(
  '[User] Submit user role',
  props<{ role: Role }>()
);

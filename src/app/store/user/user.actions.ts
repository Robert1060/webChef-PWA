import { createAction, props } from '@ngrx/store';
import { EditUserState, Role } from '../../componnts/user/user.models';

export const attemptToBlockUser = createAction(
  '[User] Attempt to block user',
  props<{ id: string }>()
);
export const blockUser = createAction(
  '[User] Block user',
  props<{ id: string }>()
);

export const deleteUser = createAction(
  '[User] Delete user',
  props<{ id: string }>()
);
export const setPassword = createAction(
  '[User] Set password',
  props<{ id: string }>()
);

export const submitUserRole = createAction(
  '[User] Submit user role',
  props<{ role: Role }>()
);

export const submtiEditUserState = createAction(
  '[User Edit] Submit edit user state',
  props<EditUserState>()
);

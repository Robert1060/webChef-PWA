import { createAction, props } from '@ngrx/store';

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

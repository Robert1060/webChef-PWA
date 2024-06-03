import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../componnts/user/user.models';

const userState = createFeatureSelector<UserState>('user');

export const selectUserEditState = createSelector(
  userState,
  (state) => state.editUser
);
export const selectUserRole = createSelector(userState, (state) => state.role);

export const selectUserFullName = createSelector(
  selectUserEditState,
  (state) => {
    const name = [state.firstName, state.lastName];
    return name.join(' ');
  }
);

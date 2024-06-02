import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const userState = createFeatureSelector<UserState>('user');

export const selectUserRole = createSelector(userState, (state) => state.role);

export const selectUserFullName = createSelector(userState, (state) => {
  const name = [state.firstName, state.lastName];
  return name.join(' ');
});

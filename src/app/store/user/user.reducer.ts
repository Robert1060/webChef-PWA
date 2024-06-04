import { createReducer, on } from '@ngrx/store';
import { submitUserRole, submtiEditUserState } from './user.actions';
import { UserState } from '../../componnts/user/user.models';

// using it as mock data
const initialState: UserState = {
  id: 'foo',
  editUser: {
    role: 'Performer',
    firstName: 'Bogdan',
    lastName: 'Boner',
    birthDate: '',
    citizienShip: [],
    files: [],
  },
};

export const userReducer = createReducer(
  initialState,
  on(submitUserRole, (state, action) => {
    return {
      ...state,
      role: action.role,
    };
  }),
  on(submtiEditUserState, (state, action) => {
    return {
      ...state,
      editUser: {
        ...state.editUser,
        ...action,
      },
    };
  })
);

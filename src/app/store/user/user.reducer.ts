import { createReducer, on } from '@ngrx/store';
import { submitUserRole, submtiEditUserState } from './user.actions';
import { UserState } from '../../componnts/user/user.models';

// using it as mock data
const initialState: UserState = {
  editUser: {
    firstName: 'Janusz',
    lastName: 'Jackman',
    birthDate: new Date(),
    citizienShip: [],
    files: [],
  },
  role: 'Performer',
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
        ...state,
        ...action,
      },
    };
  })
);

import { createReducer, on } from '@ngrx/store';
import { submitUserRole } from './user.actions';
import { UserState } from '../../componnts/user/user.models';

// using it as mock data
const initialState: UserState = {
  role: 'Performer',
  firstName: 'Janusz',
  lastName: 'Jackman',
  birthDate: new Date(),
  citizienShip: [],
  files: [],
};

export const userReducer = createReducer(
  initialState,
  on(submitUserRole, (state, action) => {
    return {
      ...state,
      role: action.role,
    };
  })
);

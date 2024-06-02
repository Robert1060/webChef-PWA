import { createReducer, on } from '@ngrx/store';
import { submitUserRole } from './user.actions';

export const roles = ['Performer', 'Dancer', 'Warrior', 'Admin'] as const;
export type Role = (typeof roles)[number];

export interface UserState {
  role: Role;
  firstName: string;
  lastName: string;
}

// using it as mock data
const initialState: UserState = {
  role: 'Performer',
  firstName: 'Janusz',
  lastName: 'Jackman',
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

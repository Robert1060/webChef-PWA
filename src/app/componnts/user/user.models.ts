import { FileData } from './edit/user-edit.component';

export const roles = ['Performer', 'Dancer', 'Warrior', 'Admin'] as const;
export type Role = (typeof roles)[number];

export interface UserState {
  role: Role;
  firstName: string;
  lastName: string;
  birthDate: Date;
  citizienShip: string[];
  files: FileData[];
  email?: string;
  instagram?: string;
  tweeter?: string;
}
export interface User extends UserState {
  id: string;
}

export interface FileData {
  contentUrl: string;
  name: string;
  size: number;
}

export interface CitizienShip {
  id: string;
  name: string;
}

export const roles = ['Performer', 'Dancer', 'Warrior', 'Admin'] as const;
export type Role = (typeof roles)[number];

export interface EditUserState {
  firstName: string;
  lastName: string;
  birthDate: string;
  citizienShip: string[];
  files: FileData[];
  email?: string;
  instagram?: string;
  tweeter?: string;
}

export interface UserState {
  id: string;
  role: Role;
  editUser?: EditUserState;
}

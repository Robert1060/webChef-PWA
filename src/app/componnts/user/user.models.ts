export interface FileData {
  contentUrl: string;
  name: string;
  size: number;
}

export interface CitizienShip {
  id: string;
  name: string;
}

export interface Permission {
  title: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export const roles = ['Performer', 'Dancer', 'Warrior', 'Admin'] as const;
export type Role = (typeof roles)[number];

export interface EditUserState {
  role: Role;
  firstName: string;
  lastName: string;
  birthDate: string;
  citizienShip: string[];
  files: FileData[];
  email?: string;
  instagram?: string;
  tweeter?: string;
  permissions?: Permission[];
}

export interface UserState {
  id: string;
  editUser?: EditUserState;
}

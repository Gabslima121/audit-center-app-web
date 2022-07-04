export type UserType = {
  id: string;
  name: string;
  email: string;
  password?: string;
  roles: object[];
}

export type RolesType = {
  name: string;
}
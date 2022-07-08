export type UserType = {
  id: string;
  name: string;
  email: string;
  password?: string;
  roles: object[];
  cpf: string;
}

export type RolesType = {
  name: string;
}
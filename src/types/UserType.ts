export type UserType = {
  id: string;
  name: string;
  email: string;
  password?: string;
  roles: object[];
  cpf: string;
  companyId: string;
}

export type RolesType = {
  name: string;
}

export type UpdateUserDTO = {
  email: string;
  name: string;
  userId: string;
}
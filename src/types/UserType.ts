export type UserType = {
  id: string;
  name: string;
  email: string;
  passwor?: string;
  roles: any;
  cpf: string;
  companies: {
    id: string;
    corporateName: string;
  };
  department: {
    id: string;
    name: string;
  };
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
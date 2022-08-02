export interface CreateCompanyDTO {
  id?: string
  corporateName: string
  cnpj: string
  state: string
  city: string
  cep: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  description?: string
}

export interface UpdateCompanyDTO {
  id?: string
  corporateName: string
  cnpj: string
  state: string
  city: string
  cep: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  description?: string
}
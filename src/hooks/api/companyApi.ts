import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

export interface CreateCompanyDTO {
  id: string
  corporateName: string
  cnpj: string
  state: string
  city: string
  cep: string
  neighborhood: string
  street: string
  number: string
  complement?: string
}

export const companyApi = () => ({
  createCompany: async (company: CreateCompanyDTO) => {
    const { status, data } = await api.post(
      'company/create',
      {
        ...company,
      },
      headers,
    )

    if (status !== 200) return data

    return data
  },

  getAllCompanies: async () => {
    const { status, data } = await api.get('company', headers)

    if (status !== 200) return data

    return data
  },

  deleteCompany: async (id: string) => {
    const { status } = await api.delete(`company/delete/${id}`, headers)

    if (status !== 200) return false

    return true
  },

  getCompanyById: async (id: string) => {
    const { status, data } = await api.get(`company/${id}`, headers)

    console.log(data)
    if (status !== 200) return data

    return data
  }
})

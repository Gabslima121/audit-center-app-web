import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

export interface CreateCompanyDTO {
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
    try {
      console.log(headers)
      const { status, data } = await api.post(
        'company/create',
        {
          company,
        },
        headers,
      )

      if (status !== 200) return {  }

      return data
    } catch (e) {
      console.log(e)
      return e
    }
  },
})

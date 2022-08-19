import { api } from '../../api'
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from '../../types/Company/CompanyInterface'
import { headers } from '../../utils/getHeaders'

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

    if (status !== 200) return data

    return data
  },

  updateCompanyById: async (id: string, company: UpdateCompanyDTO) => {
    const { status } = await api.put(
      `company/update/${id}`,
      {
        ...company,
      },
      headers,
    )

    if (status !== 200) return false

    return true
  },

  getAllCompaniesAndEachTicket: async () => {
    const { data, status } = await api.get('company/companies-and-tickets', {
      ...headers,
    })

    if (status !== 200) return data

    return data
  },

  getCompanyAndTicketsByStatus: async (ticketStatus: string) => {
    const { data, status } = await api.get(
      'company/companies-and-tickets-by-status',
      {
        ...headers,
        params: {
          status: ticketStatus,
        },
      },
    )

    if (status !== 200) return data

    return data
  },
})

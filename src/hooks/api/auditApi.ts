import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

interface CreateAuditDTO {
  title: string
  responsable: string
  responsableArea: string
  analyst: string
  status: string
  sla: string
  company: string
  openDate: string
  limitDate: string
  description: string
}

export const auditApi = () => ({
  createAudit: async (audit: CreateAuditDTO) => {
    console.log(audit)
    const { status, data } = await api.post(
      '/tickets/create',
      {
        ...audit,
      },
      headers,
    )

    if (status !== 200) return data

    return data
  },

  getAllAudits: async () => {
    const { status, data } = await api.get('/tickets', headers)

    if (status !== 200) return data

    return data
  },

  getAuditByResponsable: async (ticketStatus?: string) => {
    const { status, data } = await api.get('/tickets/get-by-responsable', {
      ...headers,
      params: {
        ticketStatus,
      },
    })

    if (status !== 200) return data

    return data
  },

  getAuditByCompany: async (companyId: string) => {
    const { status, data } = await api.get(`/tickets/get-by-company/${companyId}`, {
      ...headers,
    })

    if (status !== 200) return data

    return data
  },
})

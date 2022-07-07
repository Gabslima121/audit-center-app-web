import { api } from "../../api"
import { headers } from "../../utils/getHeaders"

interface CreateAuditDTO {
  title: string
  responsible: string
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
  }
})

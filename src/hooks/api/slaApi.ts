import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

export const slaApi = () => ({
  createSla: async (sla: any) => {
    const { status, data } = await api.post(
      'sla/create',
      {
        ...sla,
      },
      headers,
    )

    if (status !== 200) return data

    return data
  },

  getAllSlaByCompany: async (companyId: string) => {
    const { status, data } = await api.get(
      `/sla/get-sla-by-company/${companyId}`,
      headers,
    )

    if (status !== 200) return data

    return data
  },

  deleteSla: async (id: string) => {
    const { status, data } = await api.delete(`/sla/delete/${id}`, headers)

    if (status !== 200) return data

    return data
  },
})

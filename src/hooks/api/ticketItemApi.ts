import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

export const ticketItemApi = () => ({
  getTicketItemByTicketId: async (ticketId: string | any) => {
    const { status, data } = await api.get(`/ticket-item/${ticketId}`, headers)

    if (status !== 200) {
      return data.response.data.message
    }

    return data
  },

  create: async (ticketItems: [] | any, ticketId: string | any) => {
    const { data, status } = await api.post(
      `/ticket-item/create/${ticketId}`,
      { ticketItems },
      headers,
    )

    if (status !== 201) {
      return data.response.data.message
    }

    return data
  },

  delete: async (id: string) => {
    const { data, status } = await api.delete(
      `/ticket-item/delete/${id}`,
      headers,
    )

    if (status !== 200) {
      return data?.response?.data?.message
    }

    return data
  },
})

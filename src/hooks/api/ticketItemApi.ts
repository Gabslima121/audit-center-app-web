import { api } from "../../api"
import { headers } from "../../utils/getHeaders"

export const ticketItemApi = () => ({
  getTicketItemByTicketId: async (ticketId: string | any) => {
    const { status, data } = await api.get(
      `/ticket-item/${ticketId}`,
      headers,
    )

    if (status !== 200) {
      return data.response.data.message
    }

    return data
  }
})
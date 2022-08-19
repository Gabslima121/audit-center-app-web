import { api } from '../../api'
import { CreateComment } from '../../types/Comment'
import { headers } from '../../utils/getHeaders'

export const ticketsCommentsApi = () => ({
  getCommentsByTicket: async (ticketId: string | any) => {
    const { status, data } = await api.get(
      `/tickets-comments/${ticketId}/`,
      headers,
    )

    if (status !== 200) return data

    return data
  },

  createComment: async (ticektId: string | any, comment: any) => {
    const { status, data } = await api.post(
      `tickets-comments/create/${ticektId}`,
      {
        ...comment,
      },
      headers,
    )

    if (status !== 200) return data

    return data
  },

  deleteComment: async (id: string | any) => {
    const { status, data } = await api.delete(
      `/tickets-comments/delete/${id}`,
      headers,
    )

    if (status !== 200) return data

    return data
  }
})

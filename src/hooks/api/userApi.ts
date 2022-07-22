import { api } from '../../api'
import { UpdateUserDTO } from '../../types/UserType'

import { headers } from '../../utils/getHeaders'

export const userApi = () => ({
  validateToken: async (token: string) => {
    const { data, status } = await api.post('/validate-token', { token })
    console.log(data)
    if (status !== 200) {
      return data
    }

    return data
  },

  signin: async (email: string, password: string) => {
    const { data, status } = await api.post('login', { email, password })

    if (status !== 200 || !data.user || !data.accessToken) {
      return data.response.data.message
    }

    return data
  },

  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  },

  getAllUsers: async () => {
    const response = await api.get('/user', headers)

    return response.data
  },

  updateUser: async ({ email, name, userId }: UpdateUserDTO) => {
    const { data, status } = await api.put(
      `/user/update/${userId}`,
      { email, name },
      headers,
    )

    if (status !== 200) {
      return data.response.data.message
    }

    return data
  },
})

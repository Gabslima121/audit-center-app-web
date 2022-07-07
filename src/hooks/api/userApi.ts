import { api } from '../../api'

import { headers } from '../../utils/getHeaders'

export const userApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/validate', { token })
    return response.data
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
  }
})

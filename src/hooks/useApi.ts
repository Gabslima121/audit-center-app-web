import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
})

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/validate', { token })
    return response.data
  },

  signin: async (email: string, password: string) => {
    const { data, status } = await api.post('login', { email, password })

    if (status !== 200) return { message: 'Usuário ou senha inválidos' }

    if (!data.user || !data.accessToken)
      return { message: 'Usuário ou senha inválidos' }

      return data
  },

  logout: async () => {
    const response = await api.post('/logout')
    return response.data
  },
})

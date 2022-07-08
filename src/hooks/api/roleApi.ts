import { api } from "../../api"
import { headers } from "../../utils/getHeaders"

export const roleApi = () => ({
  getAllRoles: async () => {
    const response = await api.get('/role', headers)

    return response.data
  },
})
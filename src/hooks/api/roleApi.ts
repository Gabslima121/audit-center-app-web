import { api } from "../../api"
import { headers } from "../../utils/getHeaders"

export const roleApi: any = () => ({
  getAllRoles: async () => {
    const response = await api.get('/role', headers)

    return response.data
  },
})
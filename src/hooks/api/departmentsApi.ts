import { api } from '../../api'

import { headers } from '../../utils/getHeaders'

export const departmentsApi = () => ({
  getAllDepartments: async () => {
    const response = await api.get('/departments', headers)

    return response.data
  },
})

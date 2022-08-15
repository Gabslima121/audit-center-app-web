import { api } from '../../api'

import { headers } from '../../utils/getHeaders'

export const departmentsApi = () => ({
  getAllDepartments: async () => {
    const response = await api.get('/departments', headers)

    return response.data
  },

  getDepartmentsByCompanyId: async (companyId: string) => {
    const { status, data } = await api.get(
      `/departments/${companyId}`,
      headers,
    )

    if (status !== 200) {
      return data.response.data.message
    }

    return data
  },

  createDepartment: async (department: any, companyId: any) => {
    const { status, data } = await api.post(
      `departments/create/${companyId}`,
      department,
      headers,
    )

    if (status !== 201) {
      return data.response.data.message
    }

    return data
  }
})

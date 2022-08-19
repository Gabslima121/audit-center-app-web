import { api } from '../../api'
import { headers } from '../../utils/getHeaders'

export const roleApi = () => ({
  getAllRoles: async () => {
    const response = await api.get('/role', headers)

    return response.data
  },

  mapRolesToSelect: (roles: any) => {
    return roles.map((role: any) => ({
      value: role.id,
      label: role.name,
    }))
  },

  mapRoleName: (roles: any) => {
    let roleName = ''
    roles.forEach((role: any) => {
      roleName = role.name
    })

    return roleName
  },
})

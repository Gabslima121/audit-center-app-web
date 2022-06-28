import _ from 'lodash'
import { useEffect, useState } from 'react'

import { useApi } from '../../hooks/useApi'
import { UserType } from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const api = useApi()
  const [user, setUser] = useState<UserType | null>(null)
  const [roles, setRoles] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  const sigin = async (email: string, password: string) => {
    const data = await api.signin(email, password)

    setUser(data?.user)
    setRoles(data?.user?.roles)

    localStorage.setItem('user', JSON.stringify(data?.user))
    localStorage.setItem('authorization', data?.accessToken)
    return data
  }

  function getRoles() {
    const roleName: string[] = _.map(roles, 'name')

    const adminRoles =
      _.includes(roleName, 'ADMIN') && _.includes(roleName, 'SUPER_ADMIN')

    if (adminRoles) {
      setIsAdmin(true)
      setIsSuperAdmin(true)
    }
  }

  useEffect(() => {
    getRoles()
  }, [roles])

  return (
    <AuthContext.Provider
      value={{
        // logout,
        user,
        sigin,
        roles,
        isAdmin,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

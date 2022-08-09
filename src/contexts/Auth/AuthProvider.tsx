import _ from 'lodash'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { userApi } from '../../hooks/api/userApi'
import { UserType } from '../../types/UserType'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const api = userApi()
  const [user, setUser] = useState() as [UserType, (user: UserType) => void]
  const [roles, setRoles] = useState([])
  const [token, setToken] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isAuditor, setIsAuditor] = useState(false)
  const [isAnalyst, setIsAnalyst] = useState(false)

  const sigin = async (email: string, password: string) => {
    const data = await api.signin(email, password)

    setUser(data?.user)
    setRoles(data?.user?.roles)
    setToken(data?.accessToken)

    localStorage.setItem('user', JSON.stringify(data?.user))
    localStorage.setItem('authorization', data?.accessToken)
    return data
  }

  function getRoles() {
    const roleName: string[] = _.map(roles, 'name')

    const adminRoles =
      _.includes(roleName, 'ADMIN') || _.includes(roleName, 'SUPER_ADMIN')

    const auditorRole = _.includes(roleName, 'AUDITOR')

    const analystRole = _.includes(roleName, 'ANALYST')

    if (adminRoles) {
      setIsAdmin(true)
      setIsSuperAdmin(true)
      setIsAnalyst(false)
      setIsAuditor(false)
      return
    }

    if (auditorRole) {
      setIsAuditor(true)
      setIsAdmin(false)
      setIsSuperAdmin(false)
      setIsAnalyst(false)
      return
    }

    if (analystRole) {
      setIsAnalyst(true)
      setIsAdmin(false)
      setIsSuperAdmin(false)
      setIsAuditor(false)
      return
    }
  }

  const validateToken = async () => {
    const tokenData = localStorage.getItem('authorization')

    const { accessToken, payload } = await api.validateToken(tokenData!)

    setUser(payload)
    setRoles(payload.roles)
    setToken(accessToken)
    localStorage.setItem('authorization', accessToken)
  }

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {
    getRoles()
  }, [user, roles])

  return (
    <AuthContext.Provider
      value={{
        // logout,
        user,
        sigin,
        roles,
        isAdmin,
        isSuperAdmin,
        isAuditor,
        isAnalyst,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

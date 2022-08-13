import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { userApi } from '../../hooks/api/userApi'
import { UserType } from '../../types/UserType'
import { setLocalStorage } from '../../utils/localStorage'
import { AuthContext } from './AuthContext'
import { sucessMessage, errorMessage } from '../../utils/Toast/toast'
import translate from '../../helpers/translate'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const api = userApi()
  const [user, setUser] = useState() as [UserType, (user: UserType) => void]
  const [roles, setRoles] = useState([])
  const [token, setToken] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [userCompanyId, setUserCompanyId] = useState('')
  const [userCompany, setUserCompany] = useState()
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isAuditor, setIsAuditor] = useState(false)
  const [isAnalyst, setIsAnalyst] = useState(false)

  const sigin = async (email: string, password: string) => {
    const data = await api.signin(email, password)

    if (data) {
      setUserStorageInfo(data, data?.accessToken)
      sucessMessage(translate('user_connected'))
      return data
    }

    errorMessage(data.error)
    return null
  }

  const setUserStorageInfo = (data: any, accessToken: string) => {
    const { user } = data

    setUser(user)
    setRoles(user?.roles)
    setToken(accessToken)
    setUserCompanyId(user?.companyId)
    setUserCompany(user?.company)

    setLocalStorage('user', user)
    setLocalStorage('authorization', accessToken)

    if (user?.companyId && user?.company) {
      setLocalStorage('companyId', user?.companyId)
      setLocalStorage('company', user?.company)
    }

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
      return
    }

    if (auditorRole) {
      setIsAuditor(true)
      return
    }

    if (analystRole) {
      setIsAnalyst(true)
      return
    }
  }

  const validateToken = async () => {
    const tokenData = localStorage.getItem('authorization')

    const data = await api.validateToken(tokenData!)

    setUserStorageInfo(data, data?.accessToken)

    return data
  }

  useEffect(() => {
    if (user && isSuperAdmin) {
      return navigate('/home')
    }

    if (user && (isAdmin || isAuditor || isAnalyst)) {
      return navigate(`/company/detailed/tickets/${user?.companyId}`)
    }
  }, [isAuditor, isAdmin, isAnalyst, isSuperAdmin, user])

  useEffect(() => {
    validateToken()
  }, [])

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
        isAuditor,
        isAnalyst,
        userCompanyId,
        userCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

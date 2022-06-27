import { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { UserType } from '../../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const api = useApi()
  const [user, setUser] = useState<UserType | null>(null)

  const sigin = async (email: string, password: string) => {
    const data = await api.signin(email, password)

    setUser(data.user)

    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('authorization', data.accessToken)
    return data
  }

  return (
    <AuthContext.Provider
      value={{
        // logout,
        user,
        sigin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

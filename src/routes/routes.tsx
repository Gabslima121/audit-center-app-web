import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth/AuthContext'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
  const { user } = useContext(AuthContext)

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes

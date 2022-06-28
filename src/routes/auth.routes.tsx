import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login/Login'

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default AuthRoutes

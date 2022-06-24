import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ToastContainer } from 'react-toastify'

import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify'

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'
import 'react-toastify/dist/ReactToastify.css'
import './config/firebase'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
)

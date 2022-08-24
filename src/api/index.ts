import axios from 'axios'

const api = axios.create({
  // baseURL: import.meta.env.VITE_APP_API,
  baseURL: 'https://audit-center-database.herokuapp.com',
})

export { api }

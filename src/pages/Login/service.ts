import { api } from '../../api'

export interface ILogin {
  user?: object
  token?: string
  message?: string
}

class LoginService {
  storeToken(token: string) {
    localStorage.setItem('authorization', JSON.stringify(token))
  }
}

export { LoginService }

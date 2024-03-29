import { useState, useEffect, useContext } from 'react'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

import { LoginService } from './service'
import logoImg from '../../assets/img/logo-redondo.svg'
import { AuthContext } from '../../contexts/Auth/AuthContext'

import {
  sucessMessage,
  errorMessage,
  warningMessage,
} from '../../utils/Toast/toast'
import translate from '../../helpers/translate'

export function Login() {
  const { sigin } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      if (!userName || !password) {
        warningMessage('Preencha todos os campos')
      }

      await sigin(userName, password)

    } catch (e: any) {
      return errorMessage(translate(`${e?.response?.data?.message}`))
    }
  }

  return (
    <div className="flex items-stretch w-screen h-screen">
      <div className="bg-brand-300 w-2/4 text-white flex flex-col justify-center px-32 py-20">
        <h1 className="mt-4 text-4xl mb-96 ml-4 text-center">
          Estamos aqui para facilitar sua auditoria!
        </h1>
        <span className="text-lg mt-4 ml-4 text-center">
          Temos o objetivo de centralizar os problemas e gerenciar demanadas e
          processos
        </span>
      </div>

      <div className="h-full w-2/4 flex flex-col justify-center items-center">
        <img
          src={logoImg}
          alt="Imagem do logo da Audit Center"
          className="w-52 h-48 mb-10"
        />

        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl mb-10">Audit Center</h1>

          <form
            className="flex flex-col mb-10 items-center"
            onSubmit={handleLogin}
          >
            <div className="mb-4 mr-4">
              <label htmlFor="user" className="text-lg mr-1">
                Usuário:
              </label>
              <input
                onChange={e => setUserName(e.target.value)}
                id="user"
                name="user"
                className="bg-transparent placeholder-zinc-400 focus:border-input-100 focus:ring-brand-300 focus:ring-1 focus:outline-none rounded-md"
                type="text"
                placeholder="Usuário"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-lg mr-1">
                Senha:
              </label>
              <input
                onChange={e => setPassword(e.target.value)}
                id="password"
                name="password"
                className="bg-transparent placeholder-zinc-400 focus:border-input-100 focus:ring-brand-300 focus:ring-1 focus:outline-none rounded-md"
                type="password"
                placeholder="Senha"
              />
            </div>
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

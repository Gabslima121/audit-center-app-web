import { SignOut, UserRectangle } from 'phosphor-react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo-redondo.svg'

export function Header() {
  return (
    <div className="bg-white rounded-3xl p-3">
      <div className="float-right">
        <div className="flex flex-row mt-2 flex-auto">
          <Link to="/my-profile" className="my-2 mx-2">
            <UserRectangle size={25} color="#030303" className="float-left" />
            <p className="ml-8">Meu Perfil</p>
          </Link>

          <Link to="/" className="my-2 mx-2">
            <SignOut size={25} color="#030303" className="float-left" />
            <p className="ml-8">Sair</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

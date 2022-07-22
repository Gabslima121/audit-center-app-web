import { SignOut, UserRectangle } from 'phosphor-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export function Header() {
  const { user } = useContext(AuthContext)

  const handleSignOut = () => {
    localStorage.removeItem('authorization')
    localStorage.removeItem('user')
    localStorage.removeItem('companyId')
    localStorage.removeItem('company')

    window.location.reload()
  }

  return (
    <div className="bg-white rounded-3xl p-3">
      <div className="float-right">
        <div className="flex flex-row mt-2 flex-auto">
          <Link to={`/my-profile/${user?.id}`} className="my-2 mx-2">
            <UserRectangle size={25} className="float-left" />
            <p className="ml-8">Meu Perfil</p>
          </Link>

          <Link to="/" className="my-2 mx-2">
            <SignOut size={25} className="float-left" />
            <p onClick={handleSignOut} className="ml-8">Sair</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

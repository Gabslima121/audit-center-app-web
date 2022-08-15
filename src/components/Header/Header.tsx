import { SignOut, UserRectangle } from 'phosphor-react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleSignOut = () => {
    localStorage.removeItem('authorization')
    localStorage.removeItem('user')
    localStorage.removeItem('companyId')
    localStorage.removeItem('company')

    navigate('/')
    window.location.reload()
  }

  const handleRedirectToMyProfile = () => {
    navigate(`/my-profile/${user?.id}`)
  }

  return (
    <div className="bg-white rounded-3xl p-3">
      <div className="float-right">
        <div className="flex flex-row mt-2 flex-auto">
          <button onClick={handleRedirectToMyProfile} className="my-2 mx-2 hover:text-brand-300">
            <UserRectangle size={25} className="float-left" />
            <p className="ml-8">Meu Perfil</p>
          </button>

          <button onClick={handleSignOut} className="my-2 mx-2 hover:text-brand-300">
            <SignOut size={25} className="float-left" />
            <p className="ml-8 ">
              Sair
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

import { useContext } from 'react'

import { Menu } from '../Menu/Menu'
import { CompanyMenu } from '../CompanyMenu/CompanyMenu'
import logoImg from '../../assets/img/logo-redondo.svg'
import { CompanyContext } from '../../contexts/Company/CompanyContext'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export function SideBar() {
  const { company } = useContext(CompanyContext)
  const { userCompany } = useContext(AuthContext)

  return (
    <div className="w-80 bg-white rounded-r-half relative flex flex-col">
      <div className="flex justify-center items-center">
        <img src={logoImg} alt="logo" className="w-48 p-2 my-2" />
      </div>

      {company && (
        <>
          <p className="text-center text-base">
            Bem-vindo! Você está acessando a empresa{' '}
            <strong>
              {`${company?.corporateName}`}
            </strong>
          </p>

          <div className="flex flex-col items-center justify-center">
            <hr className="border-1 border-gray-400 w-52 mt-5" />
          </div>
        </>
      )}

      {userCompany && (
        <>
          <p className="text-center text-base">
            Bem-vindo! Você está acessando a empresa{' '}
            <strong>
              {`${userCompany?.corporateName}`}
            </strong>
          </p>

          <div className="flex flex-col items-center justify-center">
            <hr className="border-1 border-gray-400 w-52 mt-5" />
          </div>
        </>
      )}

      {company || userCompany ? <CompanyMenu /> : <Menu />}

    </div>
  )
}

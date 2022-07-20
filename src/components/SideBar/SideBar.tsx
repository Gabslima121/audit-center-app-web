import { useContext } from 'react'

import { Menu } from '../Menu/Menu'
import { CompanyMenu } from '../CompanyMenu/CompanyMenu'
import logoImg from '../../assets/img/logo-redondo.svg'
import { CompanyContext } from '../../contexts/Company/CompanyContext'

export function SideBar() {
  const { company } = useContext(CompanyContext)
  
  return (
    <div className="w-64 bg-white rounded-r-half relative flex flex-col">
      <img
        src={logoImg}
        alt="Imagem do logo da Audit Center"
        className="w-52 h-48 mb-6 p-2 ml-5"
      />

      <p className="text-center text-sm">
        Bem-vindo! Você está acessando a empresa <strong>{company ? (`${company.corporateName}`) : ('Aduit Center')}</strong>
      </p>

      <div className="flex flex-col items-center justify-center">
        <hr className="border-1 border-gray-400 w-52 mt-5" />
      </div>

      {company ? (
        <CompanyMenu />
      ) : (
        <Menu />
      )}
      
    </div>
  )
}

import { Buildings, ChartBar, House } from 'phosphor-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'

export function Menu() {
  const { isAdmin, isSuperAdmin } = useContext(AuthContext)

  return (
    <div className="flex flex-col mt-9 flex-auto">
      <Link to="/home" className="my-2">
        <House size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">Página Inicial</p>
      </Link>

      {isAdmin && isSuperAdmin && (
        <Link to="/companys" className="my-2">
          <Buildings size={24} color="#030303" className="ml-2 float-left"/>
          <p className="ml-10 mt-px">Empresas</p>
        </Link>
      )}

      <Link to="/graphs">
        <ChartBar size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">Gráficos</p>
      </Link>
    </div>
  )
}

import { Buildings, ChartBar, House, User } from 'phosphor-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import translate from '../../helpers/translate'

export function Menu() {
  const { isSuperAdmin } = useContext(AuthContext)

  return (
    <div className="flex flex-col mt-9 flex-auto">
      <Link to="/home" className="my-2 hover:text-brand-300">
        <House size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">{translate('admin.menu.home')}</p>
      </Link>

      {isSuperAdmin && (
        <>
          <Link to="/users" className="my-2 hover:text-brand-300">
            <User size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px">{translate('admin.menu.users')}</p>
          </Link>

          <Link to="/companys" className="my-2 hover:text-brand-300">
            <Buildings size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px">{translate('admin.menu.companies')}</p>
          </Link>
        </>
      )}

      <Link to="/graphs" className="my-2 hover:text-brand-300">
        <ChartBar size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">{translate('admin.menu.graphs')}</p>
      </Link>
    </div>
  )
}

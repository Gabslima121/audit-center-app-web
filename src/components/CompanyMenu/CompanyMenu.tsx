import { ChartBar, Clock, Ticket, User } from 'phosphor-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import { CompanyContext } from '../../contexts/Company/CompanyContext'
import translate from '../../helpers/translate'

export function CompanyMenu() {
  const { isSuperAdmin, isAdmin } = useContext(AuthContext)
  const { setCompany, setCompanyId } = useContext(CompanyContext)

  console.log(isSuperAdmin, isAdmin)

  const handleExcludeCompanyInfo = () => {
    localStorage.removeItem('companyId')
    localStorage.removeItem('company')
    setCompany(null)
    setCompanyId(null)
  }

  return (
    <div className="flex flex-col mt-9 flex-auto">
      <Link to="/company/detailed/tickets/:id" className="my-2">
        <Ticket size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">{translate('tickets')}</p>
      </Link>

      {(isSuperAdmin || isAdmin) && (
        <>
          <Link to="/define-sla" className="my-2">
            <Clock size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px">{translate('define_sla')}</p>
          </Link>
        </>
      )}

      <Link to="/graphs" className="my-2">
        <ChartBar size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px">{translate('graphs')}</p>
      </Link>

      {isSuperAdmin && (
        <Link to="/home" className="my-2">
          <User size={25} className="ml-2 float-left" />
          <p onClick={handleExcludeCompanyInfo} className="ml-10 mt-px">
            {translate('back_to_admin_panel')}
          </p>
        </Link>
      )}
    </div>
  )
}
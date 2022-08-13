import { ChartBar, Clock, Notepad, Ticket, User } from 'phosphor-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import { CompanyContext } from '../../contexts/Company/CompanyContext'
import translate from '../../helpers/translate'

export function CompanyMenu() {
  const { isSuperAdmin, isAdmin, userCompanyId } = useContext(AuthContext)
  const { setCompany, setSelectedCompanyId, selectedCompanyId } = useContext(CompanyContext)

  const handleExcludeCompanyInfo = () => {
    localStorage.removeItem('companyId')
    localStorage.removeItem('company')
    setCompany(null)
    setSelectedCompanyId(null)
  }

  return (
    <div className="flex flex-col mt-9 flex-auto">
      <Link to={`/company/detailed/tickets/${selectedCompanyId || userCompanyId}`} className="my-2">
        <Ticket size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px text-base">{translate('menu.tickets')}</p>
      </Link>

      {(isSuperAdmin || isAdmin) && (
        <>
          <Link
            to={`/company/detailed/define-sla/${selectedCompanyId}`}
            className="my-2"
          >
            <Clock size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px text-base">{translate('define_sla')}</p>
          </Link>
        </>
      )}

      <Link to="/graphs" className="my-2">
        <ChartBar size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px text-base">{translate('graphs')}</p>
      </Link>

      {isSuperAdmin && (
        <>
          <Link to={`/company/detailed/${selectedCompanyId}`} className="my-2">
            <Notepad size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px text-base">
              {translate('company.details')}
            </p>
          </Link>
          <Link to="/home" className="my-2">
            <User size={25} className="ml-2 float-left" />
            <p
              onClick={handleExcludeCompanyInfo}
              className="ml-10 mt-px text-base"
            >
              {translate('back_to_admin_panel')}
            </p>
          </Link>
        </>
      )}
    </div>
  )
}

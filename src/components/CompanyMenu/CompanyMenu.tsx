import {
  ChartBar,
  Clock,
  DiamondsFour,
  Notepad,
  Ticket,
  User,
} from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import { CompanyContext } from '../../contexts/Company/CompanyContext'
import translate from '../../helpers/translate'

export function CompanyMenu() {
  const { isSuperAdmin, isAdmin, userCompanyId, isAnalyst, isAuditor } =
    useContext(AuthContext)
  const { setCompany, setSelectedCompanyId, selectedCompanyId } =
    useContext(CompanyContext)

  const handleExcludeCompanyInfo = () => {
    localStorage.removeItem('companyId')
    localStorage.removeItem('company')
    setCompany(null)
    setSelectedCompanyId(null)
  }

  return (
    <div className="flex flex-col mt-9">
      <Link
        to={`/company/detailed/tickets/${selectedCompanyId || userCompanyId}`}
        className="my-2 hover:text-brand-300"
      >
        <Ticket size={25} className="ml-2 float-left" />
        <p className="ml-10 mt-px text-base">{translate('menu.tickets')}</p>
      </Link>

      {(isSuperAdmin || isAdmin) && (
        <>
          <Link
            to={`/company/detailed/define-sla/${selectedCompanyId}`}
            className="my-2 hover:text-brand-300"
          >
            <Clock size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px text-base">{translate('define_sla')}</p>
          </Link>

          <Link
            to={`/company/detailed/departments/${selectedCompanyId}`}
            className="my-2 hover:text-brand-300"
          >
            <DiamondsFour size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px text-base">{translate('departments')}</p>
          </Link>
        </>
      )}

      {(isAdmin || isSuperAdmin) && (
        <Link
          to={`/company/detailed/graphs/${selectedCompanyId}`}
          className="my-2 hover:text-brand-300"
        >
          <ChartBar size={25} className="ml-2 float-left" />
          <p className="ml-10 mt-px text-base">{translate('graphs')}</p>
        </Link> 
      )}

      {(isAuditor || isAnalyst) && (
        <Link
          to={`/user/graphs`}
          className="my-2 hover:text-brand-300"
        >
          <ChartBar size={25} className="ml-2 float-left" />
          <p className="ml-10 mt-px text-base">User Graphs</p>
        </Link>
      )}

      {isSuperAdmin && (
        <>
          <Link
            to={`/company/detailed/${selectedCompanyId}`}
            className="my-2 hover:text-brand-300"
          >
            <Notepad size={25} className="ml-2 float-left" />
            <p className="ml-10 mt-px text-base">
              {translate('company.details')}
            </p>
          </Link>
          <Link to="/home" className="my-2 hover:text-brand-300">
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

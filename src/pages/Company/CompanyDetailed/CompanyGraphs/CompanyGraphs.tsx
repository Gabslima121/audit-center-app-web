import { useEffect } from 'react'
import { Container } from '../../../../components/Container/Container'
import translate from '../../../../helpers/translate'
import { AllTicketsByDepartments } from './AllTicketsByDepartments/AllTicketsByDepartments'
import { AllTicketsByMainStatus } from './AllTicketsByMainStatus/AllTicketsByMainStatus'
import { useCompanyGraphs } from './useCompanyGraphs'

function CompanyGraphs() {
  const { totalTicketsByMainStatus, totalTicketsByDepartment } =
    useCompanyGraphs()

  return (
    <div className="flex-auto mt-5">
      <div>
        <h1 className="text-3xl	text-white">{translate('graphs')}</h1>
      </div>

      <Container>
        <div className="overflow-y-scroll flex flex-col h-graphs">
          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.company.total_audits_by_status')}
            </h1>
            <AllTicketsByMainStatus config={totalTicketsByMainStatus} />
          </div>

          <div className="mt-16">
            <h1 className="text-3xl m-2">
              {translate('graphs.company.total_audits_by_departments')}
            </h1>
            <AllTicketsByDepartments config={totalTicketsByDepartment} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export { CompanyGraphs }

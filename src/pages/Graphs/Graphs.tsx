import Chart from 'react-apexcharts'
import { Container } from '../../components/Container/Container'
import translate from '../../helpers/translate'
import { GraphsAduitsByDepartments } from './AuditsByDepartments/AuditsByDepartments'
import { GraphsDoneAuditsPerCompany } from './DoneAuditsPerCompany/GraphsDoneAuditsPerCompany'
import { GraphsPendingAuditsPerCompany } from './PendingAuditsPerCompany/PendingAuditsPerCompany'
import { GraphsTotalAuditsPerCompany } from './TotalAuditsPerCompany/TotalAuditsPerCompany'
import { useGraphs } from './useGraphs'

export function Graphs() {
  const {
    valueTotalAuditsPerCompany,
    valueDoneAuditsPerCompany,
    valuePendingAuditsPerCompany,
    valueAuditsPerDepartments,
  } = useGraphs()

  return (
    <div className="flex-auto mt-5">
      <div>
        <h1 className="text-3xl	text-white">{translate('graphs')}</h1>
      </div>

      <Container>
        <div className="overflow-y-scroll flex flex-col h-graphs">
          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.total_audits_per_company')}
            </h1>
            <GraphsTotalAuditsPerCompany config={valueTotalAuditsPerCompany} />
          </div>

          <div className="mt-16">
            <h1 className="text-3xl m-2">
              {translate('graphs.done_audits_per_company')}
            </h1>
            <GraphsDoneAuditsPerCompany config={valueDoneAuditsPerCompany} />
          </div>

          <div className="mt-16">
            <h1 className="text-3xl m-2">
              {translate('graphs.pending_audits_per_company')}
            </h1>
            <GraphsPendingAuditsPerCompany
              config={valuePendingAuditsPerCompany}
            />
          </div>

          <div className="mt-16">
            <h1 className="text-3xl m-2">
              {translate('graphs.audits_by_departments')}
            </h1>
            <GraphsAduitsByDepartments
              config={valueAuditsPerDepartments}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

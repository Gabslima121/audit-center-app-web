import Chart from 'react-apexcharts'
import { Container } from '../../components/Container/Container'
import translate from '../../helpers/translate'
import { GraphsTotalAuditsPerCompany } from './TotalAuditsPerCompany/TotalAuditsPerCompany'
import { useGraphs } from './useGraphs'

export function Graphs() {
  const { valueTotalAuditsPerCompany } = useGraphs()
  return (
    <div className="flex-auto mt-5">
      <div>
        <h1 className="text-3xl	text-white">{translate('graphs')}</h1>
      </div>

      <Container>
        <div className="overflow-y-scroll flex flex-col h-custom">
          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.total_audits_per_company')}
            </h1>
            <GraphsTotalAuditsPerCompany config={valueTotalAuditsPerCompany} />
          </div>

          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.total_audits_per_company')}
            </h1>
            <GraphsTotalAuditsPerCompany config={valueTotalAuditsPerCompany} />
          </div>

          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.total_audits_per_company')}
            </h1>
            <GraphsTotalAuditsPerCompany config={valueTotalAuditsPerCompany} />
          </div>

          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.total_audits_per_company')}
            </h1>
            <GraphsTotalAuditsPerCompany config={valueTotalAuditsPerCompany} />
          </div>
        </div>
      </Container>
    </div>
  )
}

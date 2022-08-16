import Chart from 'react-apexcharts'
import { Container } from '../../../components/Container/Container'

interface GraphsTotalAuditsPerCompanyProps {
  config: any
}

function GraphsTotalAuditsPerCompany({
  config,
}: GraphsTotalAuditsPerCompanyProps) {
  return (
    <div className='bg-white rounded-lg'>
      <Chart
        options={config?.options}
        series={config?.series}
        type="bar"
        height={450}
      />
    </div>
  )
}

export { GraphsTotalAuditsPerCompany }

import Chart from 'react-apexcharts'

interface GraphsDoneAuditsPerCompanyProps {
  config: any
}

function GraphsDoneAuditsPerCompany({
  config,
}: GraphsDoneAuditsPerCompanyProps) {
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

export { GraphsDoneAuditsPerCompany }

import Chart from 'react-apexcharts'

interface GraphsPendingAuditsPerCompanyProps {
  config: any
}

function GraphsPendingAuditsPerCompany({
  config,
}: GraphsPendingAuditsPerCompanyProps) {
  return (
    <div className="bg-white rounded-lg">
      <Chart
        options={config?.options}
        series={config?.series}
        type="bar"
        height={450}
      />
    </div>
  )
}

export { GraphsPendingAuditsPerCompany }

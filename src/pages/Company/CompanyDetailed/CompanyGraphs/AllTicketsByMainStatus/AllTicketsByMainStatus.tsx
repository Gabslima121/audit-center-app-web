import { useEffect } from 'react'
import Chart from 'react-apexcharts'

interface GraphsAllTicketsByMainStatusProps {
  config: any
}

function AllTicketsByMainStatus({ config }: GraphsAllTicketsByMainStatusProps) {
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

export { AllTicketsByMainStatus }

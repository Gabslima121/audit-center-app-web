import Chart from 'react-apexcharts'

interface TicketByStatusProps {
  config: any
}

function TicketByStatus({ config }: TicketByStatusProps) {
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

export { TicketByStatus }

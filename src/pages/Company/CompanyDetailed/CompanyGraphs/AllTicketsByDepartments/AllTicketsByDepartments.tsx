import Chart from 'react-apexcharts'

interface GraphsAllTicketsByDepartmentsProps {
  config: any
}

function AllTicketsByDepartments({ config }: GraphsAllTicketsByDepartmentsProps) {
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

export { AllTicketsByDepartments }

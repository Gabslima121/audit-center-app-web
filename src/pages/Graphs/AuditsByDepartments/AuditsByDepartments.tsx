import Chart from 'react-apexcharts'

interface GraphsAduitsByDepartmentsProps {
  config: any
}

function GraphsAduitsByDepartments({ config }: GraphsAduitsByDepartmentsProps) {
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

export { GraphsAduitsByDepartments }

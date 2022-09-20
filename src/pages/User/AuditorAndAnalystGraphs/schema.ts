const TOTAL_AUDITS_BY_STATUS = {
  title: '',
  options: {
    xaxis: {
      categories: ['Total de Auditorias pendentes'],
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: (y: number) => `${y.toFixed(0)}`,
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },
  },
  series: [{}],
}

export { TOTAL_AUDITS_BY_STATUS }

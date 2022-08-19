const TOTAL_AUDITS_PER_COMPANY = {
  title: '',
  options: {
    xaxis: {
      categories: ['Total de Auditorias']
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: y => `${y.toFixed(0)}`,
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

const DONE_AUDITS_PER_COMPANY = {
  title: '',
  options: {
    xaxis: {
      categories: ['Total de Auditorias concluídas']
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: y => `${y.toFixed(0)}`,
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

export { TOTAL_AUDITS_PER_COMPANY, DONE_AUDITS_PER_COMPANY }

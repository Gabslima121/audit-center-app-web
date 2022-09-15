export const AUDITS_BY_MAIN_STATUS = {
  title: '',
  options: {
    xaxis: {
      categories: ['Total de Auditorias por status'],
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

export const AUDITS_BY_DEPARTMENT = {
  title: '',
  options: {
    xaxis: {
      categories: ['Total de Auditorias por departamentos'],
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
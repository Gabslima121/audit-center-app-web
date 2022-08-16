import _ from 'lodash'
import { useEffect, useState } from 'react'

import translate from '../../helpers/translate'
import { companyApi } from '../../hooks/api/companyApi'
import { TOTAL_AUDITS_PER_COMPANY } from './schema'

const useGraphs = () => {
  const companyService = companyApi()

  const [valueTotalAuditsPerCompany, setValueTotalAuditsPerCompany] = useState(
    TOTAL_AUDITS_PER_COMPANY,
  )
  const [totalAuditsPerCompany, setTotalAuditsPerCompany] = useState([{}])

  const getTotalAuditsPerCompany = async () => {
    const tickets = await companyService.getCompanyByTicketStatus()

    const mappedTotalTickets = _.map(tickets, ticket => {
      return {
        name: ticket?.company?.corporateName,
        totalTickets: ticket?.total,
      }
    })

    setTotalAuditsPerCompany(mappedTotalTickets)
    mountChartAnswerByUnity(mappedTotalTickets)
  }

  const mountChartAnswerByUnity = (totalAuditPerCompany): any => {
    setValueTotalAuditsPerCompany({
      options: valueTotalAuditsPerCompany?.options,
      title: translate('graphs.total_audits_per_company'),
      series: _.map(totalAuditPerCompany, audits => ({
        name: audits?.name,
        data: [audits?.totalTickets],
      })),
    })
  }

  useEffect(() => {
    getTotalAuditsPerCompany()
    setValueTotalAuditsPerCompany(TOTAL_AUDITS_PER_COMPANY)


  }, [])

  useEffect(() => {
    console.log(valueTotalAuditsPerCompany)
  }, [totalAuditsPerCompany])

  return {
    valueTotalAuditsPerCompany,
  }
}

export { useGraphs }

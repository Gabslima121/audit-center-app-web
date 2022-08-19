import _ from 'lodash'
import { useEffect, useState } from 'react'
import { AUDIT_STATUS } from '../../helpers/constants'

import translate from '../../helpers/translate'
import { companyApi } from '../../hooks/api/companyApi'
import { TOTAL_AUDITS_PER_COMPANY, DONE_AUDITS_PER_COMPANY } from './schema'

const useGraphs = () => {
  const companyService = companyApi()

  const [valueTotalAuditsPerCompany, setValueTotalAuditsPerCompany] = useState(
    TOTAL_AUDITS_PER_COMPANY,
  )
  const [valueDoneAuditsPerCompany, setValueDoneAuditsPerCompany] = useState(
    DONE_AUDITS_PER_COMPANY,
  )

  const mountChartTotalAuditsByCompany = (totalAuditPerCompany): any => {
    setValueTotalAuditsPerCompany({
      options: valueTotalAuditsPerCompany?.options,
      title: translate('graphs.total_audits_per_company'),
      series: _.map(totalAuditPerCompany, audits => ({
        name: audits?.name,
        data: [audits?.totalTickets],
      })),
    })
  }

  const getTotalAuditsPerCompany = async () => {
    const tickets = await companyService.getAllCompaniesAndEachTicket()

    const mappedTotalTickets = _.map(tickets, ticket => {
      return {
        name: ticket?.company?.corporateName,
        totalTickets: ticket?.total,
      }
    })

    mountChartTotalAuditsByCompany(mappedTotalTickets)
  }

  const mountChartDoneAuditsByCompany = (doneAuditPerCompany): any => {
    setValueDoneAuditsPerCompany({
      options: valueDoneAuditsPerCompany?.options,
      title: translate('graphs.total_audits_per_company'),
      series: _.map(doneAuditPerCompany, audits => ({
        name: audits?.name,
        data: [audits?.totalTickets],
      })),
    })
  }

  const getDoneAuditsPerCompany = async () => {
    const tickets = await companyService.getCompanyAndTicketsByStatus(
      AUDIT_STATUS.DONE,
    )

    const mappedTotalTickets = _.map(tickets, ticket => {
      return {
        name: ticket?.company?.corporateName,
        totalTickets: ticket?.total,
      }
    })

    mountChartDoneAuditsByCompany(mappedTotalTickets)
  }

  useEffect(() => {
    getTotalAuditsPerCompany()
    setValueTotalAuditsPerCompany(TOTAL_AUDITS_PER_COMPANY)

    getDoneAuditsPerCompany()
  }, [])

  return {
    valueTotalAuditsPerCompany,
    valueDoneAuditsPerCompany,
  }
}

export { useGraphs }

import _ from 'lodash'
import { useEffect, useState } from 'react'
import translate from '../../../helpers/translate'
import { auditApi } from '../../../hooks/api/auditApi'
import { TOTAL_AUDITS_BY_STATUS } from './schema'

const useUserGraphs = () => {
  const ticketService = auditApi()

  const [userTicketsByStatus, setUserTicketsByStatus] = useState(
    TOTAL_AUDITS_BY_STATUS,
  )

  const getTotalTicketsByUserAndStatus = async () => {
    const tickets = await ticketService.getTicketsByUserAndStatus()

    mountTotalTicketsByUserAndStatusGraph(tickets)
  }

  const mountTotalTicketsByUserAndStatusGraph = (tickets: any) => {
    setUserTicketsByStatus({
      options: userTicketsByStatus?.options,
      title: translate('graphs.user.total_audits'),
      series: _.map(tickets, audit => ({
        name: audit?.status,
        data: [audit?.total],
      })),
    })
  }

  useEffect(() => {
    getTotalTicketsByUserAndStatus()
    setUserTicketsByStatus(TOTAL_AUDITS_BY_STATUS)
  }, [])

  return {
    userTicketsByStatus,
  }
}

export { useUserGraphs }

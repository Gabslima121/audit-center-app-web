import _ from 'lodash'
import { useEffect, useState } from 'react'
import { AUDIT_STATUS } from '../../helpers/constants'

import translate from '../../helpers/translate'
import { companyApi } from '../../hooks/api/companyApi'
import { departmentsApi } from '../../hooks/api/departmentsApi'
import {
  TOTAL_AUDITS_PER_COMPANY,
  DONE_AUDITS_PER_COMPANY,
  PENDING_AUDITS_PER_COMPANY,
  AUDITS_PER_DEPARTMENTS,
} from './schema'

const useGraphs = () => {
  const companyService = companyApi()
  const departmentsService = departmentsApi()

  const [valueTotalAuditsPerCompany, setValueTotalAuditsPerCompany] = useState(
    TOTAL_AUDITS_PER_COMPANY,
  )
  const [valueDoneAuditsPerCompany, setValueDoneAuditsPerCompany] = useState(
    DONE_AUDITS_PER_COMPANY,
  )
  const [valuePendingAuditsPerCompany, setValuePendingAuditsPerCompany] =
    useState(PENDING_AUDITS_PER_COMPANY)
  const [valueAuditsPerDepartments, setValueAuditsPerDepartments] = useState(
    AUDITS_PER_DEPARTMENTS,
  )

  const mountChartTotalAuditsByCompany = (
    totalAuditPerCompany: { name: any; totalTickets: any }[],
  ) => {
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

  const mountChartDoneAuditsByCompany = (
    doneAuditPerCompany: { name: any; totalTickets: any }[],
  ): any => {
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

  const mountChartPendingAuditsByCompany = (
    pendingAuditPerCompany: { name: any; totalTickets: any }[],
  ): any => {
    setValuePendingAuditsPerCompany({
      options: valuePendingAuditsPerCompany?.options,
      title: translate('graphs.total_audits_per_company'),
      series: _.map(pendingAuditPerCompany, audits => ({
        name: audits?.name,
        data: [audits?.totalTickets],
      })),
    })
  }

  const getPendingAuditsPerCompany = async () => {
    const tickets = await companyService.getCompanyAndTicketsByStatus(
      AUDIT_STATUS.PENDING,
    )

    const mappedPendingTickets = _.map(tickets, ticket => {
      return {
        name: ticket?.company?.corporateName,
        totalTickets: ticket?.total,
      }
    })

    mountChartPendingAuditsByCompany(mappedPendingTickets)
  }

  const mountChartAuditsByDepartments = (
    auditsByDepartments: { name: any; totalTickets: any }[],
  ): any => {
    setValueAuditsPerDepartments({
      options: valuePendingAuditsPerCompany?.options,
      title: translate('graphs.total_audits_per_company'),
      series: _.map(auditsByDepartments, audits => ({
        name: audits?.name,
        data: [audits?.totalTickets],
      })),
    })
  }

  const getAuditsByDepartments = async () => {
    const departments = await departmentsService.getDepartmentsAndTickets()

    const mappedTicketsAndDepartments = _.map(departments, department => {
      return {
        name: `${department?.department?.name} (${department?.department?.company?.corporateName})`,
        totalTickets: department?.total,
      }
    })

    mountChartAuditsByDepartments(mappedTicketsAndDepartments)
  }

  useEffect(() => {
    getTotalAuditsPerCompany()
    setValueTotalAuditsPerCompany(TOTAL_AUDITS_PER_COMPANY)

    getDoneAuditsPerCompany()
    setValueDoneAuditsPerCompany(DONE_AUDITS_PER_COMPANY)

    getPendingAuditsPerCompany()
    setValuePendingAuditsPerCompany(PENDING_AUDITS_PER_COMPANY)

    getAuditsByDepartments()
    setValueAuditsPerDepartments(AUDITS_PER_DEPARTMENTS)
  }, [])

  return {
    valueTotalAuditsPerCompany,
    valueDoneAuditsPerCompany,
    valuePendingAuditsPerCompany,
    valueAuditsPerDepartments,
  }
}

export { useGraphs }

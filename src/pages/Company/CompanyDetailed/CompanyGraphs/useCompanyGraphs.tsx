import { isEmpty } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import { auditApi } from '../../../../hooks/api/auditApi'
import { departmentsApi } from '../../../../hooks/api/departmentsApi'
import {
  MountTicketsByDepartmentsChart,
  MountTicketsByStatusChart,
} from '../../../../types/Audit'
import { AUDITS_BY_DEPARTMENT, AUDITS_BY_MAIN_STATUS } from './schema'

const useCompanyGraphs = () => {
  const { selectedCompanyId } = useContext(CompanyContext)
  const ticketService = auditApi()
  const departmentService = departmentsApi()

  const [totalTicketsByMainStatus, setTotalTicketsByMainStatus] = useState(
    AUDITS_BY_MAIN_STATUS,
  )
  const [totalTicketsByDepartment, setTotalTicketsByDepartment] =
    useState(AUDITS_BY_DEPARTMENT)

  const mountChartAuditsByMainStatus = (tickets: []) => {
    const newTicketsArray: any = []

    tickets.forEach(ticket => {
      if (!isEmpty(ticket)) {
        newTicketsArray.push(ticket)
      }
    })

    setTotalTicketsByMainStatus({
      options: totalTicketsByMainStatus?.options,
      title: 'Total de auditorias por status',
      series: newTicketsArray.map((ticket: MountTicketsByStatusChart) => ({
        name: ticket?.status,
        data: [ticket?.total],
      })),
    })
  }

  const getTotalTicketsByMainStatus = async () => {
    const tickets: any = await ticketService.getAllTicketsByMainStatus(
      selectedCompanyId,
    )

    mountChartAuditsByMainStatus(tickets)
  }

  const mountChartAuditsByDepartments = (tickets: any) => {
    setTotalTicketsByDepartment({
      options: totalTicketsByDepartment?.options,
      title: 'Total de auditorias por departamento',
      series: tickets.map((ticket: MountTicketsByDepartmentsChart) => ({
        name: ticket?.department?.name,
        data: [ticket?.total],
      })),
    })
  }

  const getTicketsByCompanyAndDepartment = async () => {
    const tickets = await departmentService.getDepartmentsAndTicketsByCompanyId(
      selectedCompanyId,
    )

    mountChartAuditsByDepartments(tickets)
  }

  useEffect(() => {
    getTotalTicketsByMainStatus()
    setTotalTicketsByMainStatus(AUDITS_BY_MAIN_STATUS)

    getTicketsByCompanyAndDepartment()
    setTotalTicketsByDepartment(AUDITS_BY_DEPARTMENT)
  }, [])

  return {
    totalTicketsByMainStatus,
    totalTicketsByDepartment,
  }
}

export { useCompanyGraphs }

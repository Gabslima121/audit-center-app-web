import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import { auditApi } from '../../../../hooks/api/auditApi'

const useCompanyTickets = () => {
  const { isAuditor, user, isAnalyst, isAdmin, isSuperAdmin, userCompanyId } =
    useContext(AuthContext)
  const { selectedCompanyId } = useContext(CompanyContext)
  const ticketsService = auditApi()
  const [tickets, setTickets] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  const getAllTicketsByCompany = async () => {
    const tickets = await ticketsService.getAuditByCompany(selectedCompanyId || userCompanyId)

    setTickets(tickets)
  }

  async function getTicketsByAuditor() {
    const { data } = await ticketsService.getAuditByResponsable()

    if (!data) setTickets([])

    setTickets(data?.tickets)
  }

  async function getTicketsByAnalyst() {
    const response = await ticketsService.getAduditsByAnalyst()

    if (!response) setTickets([])

    setTickets(response)
  }

  const handleGetTickets = async () => {
    if (isSuperAdmin || isAuditor) {
      await getAllTicketsByCompany()
    }

    if (isAnalyst) {
      await getTicketsByAnalyst()
    }
  }

  useEffect(() => {
    handleGetTickets()
  }, [isAnalyst, isAuditor, user])

  useEffect(() => {
    console.log(tickets)
  }, [tickets])

  return {
    tickets,
    getAllTicketsByCompany,
    handleCloseModal,
    handleOpenModal,
    modalIsOpen,
    getTicketsByAuditor,
    handleGetTickets,
  }
}

export { useCompanyTickets }

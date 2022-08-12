import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import { auditApi } from '../../../../hooks/api/auditApi'

const useCompanyTickets = () => {
  const { isAuditor, user, isAnalyst, isAdmin, isSuperAdmin } =
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
    const tickets = await ticketsService.getAuditByCompany(selectedCompanyId)

    setTickets(tickets)
  }

  async function getTicketsByAuditor() {
    const { data } = await ticketsService.getAuditByResponsable()

    if (!data) setTickets([])

    setTickets(data?.tickets)
  }

  async function getTicketsByAnalyst() {
    const { data } = await ticketsService.getAduditsByAnalyst()

    if (!data) setTickets([])

    setTickets(data?.tickets)
  }

  const handleGetTickets = async () => {
    if (isSuperAdmin) {
      await getAllTicketsByCompany()
    }

    if (isAuditor) {
      await getTicketsByAuditor()
    }

    if (isAnalyst) {
      console.log('isAnalyst', isAnalyst)
      await getTicketsByAnalyst()
    }
  }

  useEffect(() => {
    handleGetTickets()
  }, [isAuditor, user])

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

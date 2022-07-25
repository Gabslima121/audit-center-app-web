import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../components/Button/Button'
import { CompanyTicketsTable } from '../../../../components/CompanyTicketsTable/CompanyTicketsTable'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import translate from '../../../../helpers/translate'
import { auditApi } from '../../../../hooks/api/auditApi'
import { AddAuditModal } from '../../../Home/AddAuditModal/AddAuditModal'

function CompanyTickets() {
  const { companyId } = useContext(CompanyContext)
  const auditService = auditApi()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [ticketsByCompany, setTicketsByCompany] = useState([])

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  const getAllTicketsByCompany = async () => {
    const tickets = await auditService.getAuditByCompany(companyId)

    setTicketsByCompany(tickets)
  }

  useEffect(() => {
    getAllTicketsByCompany()
  }, [modalIsOpen])

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>{translate('create_audit')}</Button>
        </div>

        <AddAuditModal isOpen={modalIsOpen} setIsOpen={handleCloseModal} />

        <h1 className="text-3xl	text-white">{translate('tickets')}</h1>
      </div>

      <div className="mt-11 bg-gray-100 rounded-lg p-2 shadow-3xl">
        <CompanyTicketsTable tickets={ticketsByCompany} />
      </div>
    </div>
  )
}

export { CompanyTickets }

import { useEffect, useState } from 'react'
import { AuditTable } from '../../components/AuditsTable/AuditTable'

import { Button } from '../../components/Button/Button'
import { auditApi } from '../../hooks/api/auditApi'
import { AddAuditModal } from './AddAuditModal/AddAuditModal'
import { Container } from '../../components/Container/Container'

function Home() {
  const ticketsService = auditApi()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [tickets, setTickets] = useState([])

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  async function getAllTickets() {
    const tickets = await ticketsService.getAllAudits()

    setTickets(tickets)
  }

  useEffect(() => {
    getAllTickets()
  }, [modalIsOpen, handleCloseModal])

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>Cadastrar Auditoria</Button>
        </div>

        <AddAuditModal isOpen={modalIsOpen} setIsOpen={handleCloseModal} />

        <h1 className="text-3xl	text-white">Página Inicial</h1>
      </div>

      <Container>
        <AuditTable audits={tickets} />
      </Container>
    </div>
  )
}

export { Home }

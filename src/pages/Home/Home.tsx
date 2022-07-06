import { useState } from 'react'

import { Button } from '../../components/Button/Button'
import { AddAuditModal } from './AddAuditModal/AddAuditModal'

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>Cadastrar Auditoria</Button>
        </div>

        <AddAuditModal isOpen={modalIsOpen}
          setIsOpen={handleCloseModal}
        />

        <h1 className="text-3xl	text-white">Página Inicial</h1>
      </div>

      <div className="mt-16 bg-white rounded-lg p-2"></div>
    </div>
  )
}

export { Home }

import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AuditHeaders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  const auditHeaders: object[] = [
    {
      name: 'Título',
      selector: 'title',
    },
    {
      name: 'Data de Abertura',
      selector: 'openDate',
    },
    {
      name: 'Data Limmite',
      selector: 'limitDate',
    },
    {
      name: 'Status',
      selector: 'status',
    },
    {
      name: 'Empresa',
      selector: 'company.corporateName',
    },
    {
      name: 'Ações',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
            <button className="text-brand-300 mr-2">
              <Link to={`/tickets/detailed/${row.id}`}>Acessar</Link>
            </button>

            <button onClick={handleOpenModal} className="text-brand-300">
              <Trash size={24} color="#cc2828" />
            </button>
          </div>
        </>
      ),
    },
  ]

  return {
    auditHeaders,
    modalIsOpen,
    setModalIsOpen,
  }
}

export { AuditHeaders }

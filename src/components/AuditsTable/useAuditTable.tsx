import moment from 'moment'
import { PencilCircle, Trash } from 'phosphor-react'
import { useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

interface DataRow {
  id: string
  title: string
  openDate: string
  responsableArea: {
    name: string
  }
  status: number
  company: {
    corporateName: string,
  }
  responsable: {
    name: string,
  }
  analyst: {
    name: string,
  }
}

const useAuditTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [ticketId, setTicketId] = useState('')

  function handleOpenDeletModal(incomingTicketId: string) {
    setTicketId(incomingTicketId)
    setModalIsOpen(true)
  }

  const auditHeaders: TableColumn<DataRow>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      omit: true,
    },
    {
      name: 'Título',
      selector: row => row.title,
    },
    {
      name: 'Data de Abertura',
      selector: row => moment(row.openDate).format('DD/MM/YYYY'),
    },
    {
      name: 'Departamento',
      selector: row => row.responsableArea.name,
    },
    {
      name: 'Status',
      selector: row => row.status,
    },
    {
      name: 'Empresa',
      selector: row => row.company.corporateName,
    },
    {
      name: 'Auditor',
      selector: row => row.responsable.name,
    },
    {
      name: 'Analista',
      selector: row => row.analyst.name,
    },
    {
      name: 'Ações',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
            <button className="text-brand-300 mr-2">
              <Link
                to={`/ticket/detailed/${row.id}`}
              >
                <PencilCircle size={24} />
              </Link>
            </button>

            <button
              onClick={() => handleOpenDeletModal(row.id)}
              className="text-brand-300"
            >
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
    ticketId,
  }
}

export { useAuditTable }

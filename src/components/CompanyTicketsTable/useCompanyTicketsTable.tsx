import moment from 'moment'
import { PencilCircle, Trash } from 'phosphor-react'
import { useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link, useLocation } from 'react-router-dom'

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

const useCompanyTicketTable = () => {
  const location = useLocation()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const currentUrl = location.pathname

  function handleOpenDeletModal(incomingTicketId: string) {
    setTicketId(incomingTicketId)
    setModalIsOpen(true)
  }

  const companyTicketsHeaders: TableColumn<DataRow>[] = [
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
                to={`${currentUrl}/edit-ticket/${row.id}`}
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
    companyTicketsHeaders,
    modalIsOpen,
    setModalIsOpen,
    ticketId,
  }
}

export { useCompanyTicketTable }

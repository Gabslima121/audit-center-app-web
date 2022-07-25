import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

interface DataRow {
  id: string
  name: string,
  description: string,
  sla: string,
  typeSla: string,
}

const useCompanySlaTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [slaId, setSlaId] = useState('')

  function handleOpenDeletModal(incomingSlaId: string) {
    setSlaId(incomingSlaId)
    setModalIsOpen(true)
  }

  const slaHeaders: TableColumn<DataRow>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      omit: true,
    },
    {
      name: 'Nome SLA',
      selector: row => row.name,
    },
    {
      name: 'Descrição',
      selector: row => row.description,
    },
    {
      name: 'Tempo SLA',
      selector: row => row.sla,
    },
    {
      name: 'Medida de Tempo',
      selector: row => row.typeSla,
    },
    {
      name: 'Ações',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
            <button className="text-brand-300 mr-2">
              <Link
                onClick={() => setSlaId(row.id)}
                to={`/company/detailed/${row.id}`}
              >
                Acessar
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
    slaHeaders,
    modalIsOpen,
    setModalIsOpen,
    slaId,
  }
}

export { useCompanySlaTable }

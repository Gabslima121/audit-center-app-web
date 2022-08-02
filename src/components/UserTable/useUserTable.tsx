import { PencilCircle, Trash } from 'phosphor-react'
import { useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

interface DataRow {
  id: string
  name: string
  email: string
  cpf: string
  role: [
    {
      name: string
    },
  ]
  companies: {
    corporateName: string
  }
}

const useUserTable = () => {
  const [incomingUserId, setIncomeUserId] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenDeletModal(incomingUserId: string) {
    setIncomeUserId(incomingUserId)
    setModalIsOpen(true)
  }
  const userHeaders: TableColumn<DataRow>[] = [
    {
      name: 'ID',
      selector: row => row?.id,
      omit: true,
    },
    {
      name: 'Nome',
      selector: row => row?.name,
    },
    {
      name: 'E-mail',
      selector: row => row?.email,
    },
    {
      name: 'CPF',
      selector: row => row?.cpf,
    },
    {
      name: 'Empresa',
      selector: row => row?.companies?.corporateName,
    },
    {
      name: 'Ações',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
            <button className="text-brand-300 mr-2">
              <Link
                onClick={() => setIncomeUserId(row.id)}
                to={`/user/edit/${row.id}`}
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
    userHeaders,
    incomingUserId,
    modalIsOpen,
    setModalIsOpen,
  }
}

export { useUserTable }

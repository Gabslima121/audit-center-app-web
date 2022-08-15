import { PencilCircle, Trash } from 'phosphor-react'
import { useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

interface DataRow {
  id: string
  name: string
  description: string
  company: {
    corporateName: string
  }
}

const useCompanyDepartmentsTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [deparmentId, setDepartmentId] = useState('')

  function handleOpenDeletModal(incomingDeparmentId: string) {
    setDepartmentId(incomingDeparmentId)
    setModalIsOpen(true)
  }

  const departmentsHeaders: TableColumn<DataRow>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      omit: true,
    },
    {
      name: 'Departamento',
      selector: row => row.name,
    },
    {
      name: 'Empresa',
      selector: row => row.company.corporateName,
    },
    {
      name: 'Ação',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
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
    departmentsHeaders,
    modalIsOpen,
    setModalIsOpen,
    deparmentId,
  }
}

export { useCompanyDepartmentsTable }

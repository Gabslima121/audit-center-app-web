import { Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { Link } from 'react-router-dom'

interface DataRow {
  id: string;
  corporateName: string;
  cnpj: string;
  openTickets: number;
  closedTickets: number;
}


const CompanyHeaders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [companyId, setCompanyId] = useState('')

  function handleOpenModal(incomingCompanyId: string) {
    setCompanyId(incomingCompanyId)
    setModalIsOpen(true)
  }

  const companyHeaders: TableColumn<DataRow>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      omit: true,
    },
    {
      name: 'Razão Social',
      selector:  row => row.corporateName,
    },
    {
      name: 'CNPJ',
      selector: row => row.cnpj,
    },
    {
      name: 'Quantidade de Chamados em Aberto',
      selector: row => row.openTickets,
    },
    {
      name: 'Quantidade de Chamados Concluídos',
      selector: row => row.closedTickets,
    },
    {
      name: 'Ações',
      button: true,
      cell: (row: any) => (
        <>
          <div className="flex flex-row">
            <button className="text-brand-300 mr-2">
              <Link to={`/company/detailed/${row.id}`}>Acessar</Link>
            </button>

            <button onClick={() => handleOpenModal(row.id)} className="text-brand-300">
              <Trash size={24} color="#cc2828" />
            </button>
          </div>
        </>
      ),
    },
  ]

  return {
    companyHeaders,
    modalIsOpen,
    setModalIsOpen,
    companyId,
  }
}

export { CompanyHeaders }

import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CompanyHeaders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  const companyHeaders: object[] = [
    {
      name: 'Razão Social',
      selector: 'corporateName',
    },
    {
      name: 'CNPJ',
      selector: 'cnpj',
    },
    {
      name: 'Quantidade de Chamados em Aberto',
      selector: 'openTickets',
    },
    {
      name: 'Quantidade de Chamados Concluídos',
      selector: 'closedTickets',
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

            <button onClick={handleOpenModal} className="text-brand-300">
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
  }
}

export { CompanyHeaders }

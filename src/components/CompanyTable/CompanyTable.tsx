import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

import translate from '../../helpers/translate'
import { CompanyHeaders } from './useCompanyTable'

import trash from '../../assets/img/trash.svg'

interface CompanyTableProps {
  companies: any[]
}

function CompanyTable({ companies }: CompanyTableProps) {
  const { companyHeaders, modalIsOpen, setModalIsOpen, companyId } = CompanyHeaders()

  async function handleExcludeCompany(){
    
  }

  return (
    <>
      <DataTable
        columns={companyHeaders}
        data={companies}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={companies?.length}
        noDataComponent={translate('no_company_registered')}
      />

      <div>
        <Modal isOpen={modalIsOpen} className="mt-28">
          <div className="ml-modal-trash items-center">
            <img src={trash} alt="Imagem de um lixo" />
          </div>

          <ModalBody>
            <h2 className="text-center text-2xl">
              Deseja mesmo remover esta empresa?
            </h2>
          </ModalBody>

          <ModalFooter>
            <button onClick={handleExcludeCompany} className="border-1 border-button_exclude-100 text-button_exclude-100 w-full p-1 rounded-md">
              Excluir
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="border-1 border-brand-100 text-brand-100 w-full p-1 rounded-md"
            >
              Voltar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export { CompanyTable }

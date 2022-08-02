import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import translate from '../../helpers/translate'
import { useCompanyTable } from './useCompanyTable'
import { companyApi } from '../../hooks/api/companyApi'
import { sucessMessage, errorMessage } from '../../utils/Toast/toast'

import trash from '../../assets/img/trash.svg'

interface CompanyTableProps {
  companies: any[]
}

function CompanyTable({ companies }: CompanyTableProps) {
  
  const companySerivce = companyApi()
  const { companyHeaders, modalIsOpen, setModalIsOpen, incomingCompanyId } =
    useCompanyTable()

  async function handleExcludeCompany() {
    const response = await companySerivce.deleteCompany(incomingCompanyId)

    if (response) {
      sucessMessage(translate('company_deleted'))
      setModalIsOpen(false)
      return
    }

    errorMessage(translate('company_not_deleted'))
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
            <button
              onClick={handleExcludeCompany}
              className="border-1 border-button_exclude-200 text-button_exclude-200 hover:bg-button_exclude-100 w-full p-1 rounded-md"
            >
              {translate('exclude')}
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="border-1 border-brand-100 text-brand-100 hover:bg-brand-90 w-full p-1 rounded-md"
            >
              {translate('back')}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export { CompanyTable }

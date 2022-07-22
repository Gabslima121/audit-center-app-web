import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import translate from '../../helpers/translate'
import { useCompanyTicketTable } from './useCompanyTicketsTable'

import trash from '../../assets/img/trash.svg'

interface CompanyTicketsTableProps {
  tickets: any[]
}

function CompanyTicketsTable({ tickets }: CompanyTicketsTableProps) {
  const { companyTicketsHeaders, modalIsOpen, setModalIsOpen, ticketId } =
    useCompanyTicketTable()

  const handleExcludeCompanyTicket = async () => {}

  return (
    <>
      <DataTable
        columns={companyTicketsHeaders}
        data={tickets}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={tickets?.length}
        noDataComponent={translate('no_audit_found')}
      />

      <div>
        <Modal isOpen={modalIsOpen} className="mt-28">
          <div className="ml-modal-trash items-center">
            <img src={trash} alt="Imagem de um lixo" />
          </div>

          <ModalBody>
            <h2 className="text-center text-2xl">
              {translate('delete_audit_confirmation')}
            </h2>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleExcludeCompanyTicket}
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

export { CompanyTicketsTable }

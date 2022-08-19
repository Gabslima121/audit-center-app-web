import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import translate from '../../helpers/translate'
import { useCompanyTicketTable } from './useCompanyTicketsTable'

import trash from '../../assets/img/trash.svg'
import { auditApi } from '../../hooks/api/auditApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'
import { customStyles } from '../../utils/tableStyle'
import { useEffect } from 'react'

interface CompanyTicketsTableProps {
  tickets: any[]
}

function CompanyTicketsTable({ tickets }: CompanyTicketsTableProps) {
  const auditService = auditApi()
  const { companyTicketsHeaders, modalIsOpen, setModalIsOpen, ticketId } =
    useCompanyTicketTable()

  const handleExcludeCompanyTicket = async () => {
    const response = await auditService.deleteTicketById(ticketId)

    if (response) {
      sucessMessage(translate('ticket_deleted'))
      setModalIsOpen(false)
      return
    }

    errorMessage(translate('ticket_not_deleted'))
  }

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
        customStyles={customStyles}
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

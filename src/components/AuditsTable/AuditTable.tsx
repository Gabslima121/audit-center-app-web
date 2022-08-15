import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import translate from '../../helpers/translate'
import { useAuditTable } from './useAuditTable'

import trash from '../../assets/img/trash.svg'
import { auditApi } from '../../hooks/api/auditApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'
import { customStyles } from '../../utils/tableStyle'
import { useEffect } from 'react'

interface AuditTableProps {
  audits: any[]
  getAllTickets: () => void
}

function AuditTable({ audits, getAllTickets}: AuditTableProps) {
  const auditService = auditApi()
  const { auditHeaders, modalIsOpen, setModalIsOpen, ticketId } =
    useAuditTable()

  async function handleExcludeTicket() {
    const response = await auditService.deleteTicketById(ticketId)

    if (response) {
      sucessMessage(translate('ticket_deleted'))
      setModalIsOpen(false)
      return
    }

    errorMessage(translate('ticket_not_deleted'))
  }

  useEffect(() => {
    getAllTickets()
  }, [modalIsOpen])

  return (
    <>
      <DataTable
        columns={auditHeaders}
        data={audits}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={audits?.length}
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
              Deseja mesmo remover esta auditoria?
            </h2>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleExcludeTicket}
              className="border-1 border-button_exclude-200 text-button_exclude-200 hover:bg-button_exclude-100 w-full p-1 rounded-md"
            >
              Excluir
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="border-1 border-brand-100 text-brand-100 hover:bg-brand-90 w-full p-1 rounded-md"
            >
              Voltar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export { AuditTable }

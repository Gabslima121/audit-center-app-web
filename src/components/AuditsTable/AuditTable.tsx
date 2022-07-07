import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

import translate from '../../helpers/translate'
import { AuditHeaders } from './headers'

import trash from '../../assets/img/trash.svg'

interface AuditTableProps {
  audits: any[]
}

function AuditTable({ audits }: AuditTableProps) {
  const { auditHeaders, modalIsOpen, setModalIsOpen } = AuditHeaders()
  useEffect(() => {
    console.log(audits)
  }, [])

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
            <button className="border-1 border-button_exclude-100 text-button_exclude-100 w-full p-1 rounded-md">
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

export { AuditTable }

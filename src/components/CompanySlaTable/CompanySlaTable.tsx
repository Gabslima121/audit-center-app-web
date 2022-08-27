import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import translate from '../../helpers/translate'
import { useCompanySlaTable } from './useCompanySlaTable'

import trash from '../../assets/img/trash.svg'
import { slaApi } from '../../hooks/api/slaApi'
import { customStyles } from '../../utils/tableStyle'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'
import { useEffect } from 'react'

interface CompanySlaTableProps {
  sla: any[]
  getAllSlaByCompany: () => void
}

function CompanySlaTable({ sla, getAllSlaByCompany }: CompanySlaTableProps) {
  const slaService = slaApi()
  const { slaHeaders, modalIsOpen, setModalIsOpen, slaId } =
    useCompanySlaTable()

  async function handleExcludeSla() {
    const response = await slaService.deleteSla(slaId)

    if (response) {
      sucessMessage(translate('sla_deleted'))
      setModalIsOpen(false)
      return
    }

    errorMessage(translate('sla_not_deleted'))
  }

  useEffect(() => {
    getAllSlaByCompany()
  }, [modalIsOpen])

  return (
    <>
      <DataTable
        columns={slaHeaders}
        data={sla}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={sla?.length}
        noDataComponent={translate('no_sla_registered')}
        customStyles={customStyles}
      />

      <div>
        <Modal isOpen={modalIsOpen} className="mt-28">
          <div className="ml-modal-trash items-center">
            <img src={trash} alt="Imagem de um lixo" />
          </div>

          <ModalBody>
            <h2 className="text-center text-2xl">
              {translate('delete_sla_confirmation')}
            </h2>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleExcludeSla}
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

export { CompanySlaTable }

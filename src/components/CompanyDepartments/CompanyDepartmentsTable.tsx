import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import translate from '../../helpers/translate'

import trash from '../../assets/img/trash.svg'
import { customStyles } from '../../utils/tableStyle'
import { useCompanyDepartmentsTable } from './useCompanyDepartmentsTable'
import { departmentsApi } from '../../hooks/api/departmentsApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'
import { useEffect } from 'react'

interface CompanyDepartmentsTableProps {
  departments: any[]
  getAllDepartments: () => void
}

function CompanyDepartmentsTable({
  departments,
  getAllDepartments,
}: CompanyDepartmentsTableProps) {
  const departmentService = departmentsApi()
  const { departmentsHeaders, modalIsOpen, deparmentId, setModalIsOpen } =
    useCompanyDepartmentsTable()

  async function handleExcludeDepartment() {
    const { status, message } = await departmentService.deleteDepartment(
      deparmentId,
    )

    if (status && message) {
      setModalIsOpen(false)
      return sucessMessage(translate(`${message}`))
    }

    return errorMessage('Deparment not deleted')
  }

  useEffect(() => {
    getAllDepartments()
  }, [modalIsOpen])

  return (
    <>
      <DataTable
        columns={departmentsHeaders}
        data={departments}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={departments?.length}
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
              {translate('department.confirm_delete')}
            </h2>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleExcludeDepartment}
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

export { CompanyDepartmentsTable }

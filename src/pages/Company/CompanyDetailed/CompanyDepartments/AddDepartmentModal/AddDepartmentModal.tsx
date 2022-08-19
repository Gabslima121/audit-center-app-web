import { X } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from '../../../../../components/Button/Button'
import { Input } from '../../../../../components/Input/Input'
import { Label } from '../../../../../components/Label/Label'
import { Select } from '../../../../../components/Select/Select'
import { CompanyContext } from '../../../../../contexts/Company/CompanyContext'
import translate from '../../../../../helpers/translate'
import { departmentsApi } from '../../../../../hooks/api/departmentsApi'
import { DEPARTMENT_INITIAL_STATE } from '../../../../../types/Deparment'
import { errorMessage, sucessMessage } from '../../../../../utils/Toast/toast'

interface DepartmentModalProps {
  isOpen: boolean
  closeModal: () => void
}

function AddDepartmentModal({ isOpen, closeModal }: DepartmentModalProps) {
  const { selectedCompanyId, company } = useContext(CompanyContext)

  const departmentService = departmentsApi()

  const [department, setDepartment] = useState(DEPARTMENT_INITIAL_STATE)
  const [companyOptions, setCompanyOptions] = useState<any>([])

  const handleChangeDepartmentData = (
    property: string,
    event?: {
      target: { id: any; value: any }
    },
  ) => {
    const param = { [property]: event?.target?.value }

    setDepartment((prevState: typeof department) => ({
      ...prevState,
      ...param,
    }))
  }

  const handleCreateDepartment = async () => {
    const response = await departmentService.createDepartment(
      department,
      company?.id,
    )

    if (response) {
      sucessMessage(translate('department.created'))
      closeModal()
    }

    errorMessage(response.message)
  }

  useEffect(() => {
    const selectedCompany = [
      {
        id: company?.id,
        corporateName: company?.corporateName,
      },
    ]
    setDepartment((prevState: typeof department) => ({
      ...prevState,
      company: selectedCompanyId,
    }))
    setCompanyOptions(selectedCompany)
  }, [isOpen])

  return (
    <Modal isOpen={isOpen}>
      <div className="m-3">
        <button onClick={() => closeModal()} className="float-right">
          <X size={24} color="#030303" />
        </button>

        <h1 className="text-2xl mb-2">
          {translate('department.create_department')}
        </h1>
        <span>{translate('department.create_description')}</span>
      </div>
      <hr />

      <ModalBody>
        <div>
          <form>
            <div className="grid grid-cols-2 gap-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="company"
                  text={translate('department.company')}
                  className="text-base mb-1"
                />
                <Select
                  id="company"
                  options={companyOptions}
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={department?.company}
                  onChange={option =>
                    handleChangeDepartmentData('company', option)
                  }
                  disabled={true}
                />
              </div>

              <div>
                <Label
                  htmlFor="name"
                  text={translate('department.name')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={department?.name}
                  onChange={e => handleChangeDepartmentData('name', e)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mb-2">
              <div>
                <Label
                  htmlFor="description"
                  text={translate('ticket.description')}
                  className="text-xs mb-1"
                />
                <textarea
                  id="description"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  placeholder={translate('ticket.description')}
                  value={department?.description}
                  onChange={e => handleChangeDepartmentData('description', e)}
                />
              </div>
            </div>

            <div className="flex flex-row-reverse">
              <div>
                <Button
                  onClick={handleCreateDepartment}
                  type="button"
                >
                  {translate('save_informations')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  )
}

export { AddDepartmentModal }

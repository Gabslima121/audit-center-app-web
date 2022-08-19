import _ from 'lodash'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from '../../../../components/Button/Button'
import { Input } from '../../../../components/Input/Input'
import { Label } from '../../../../components/Label/Label'
import { Select } from '../../../../components/Select/Select'
import translate from '../../../../helpers/translate'
import { companyApi } from '../../../../hooks/api/companyApi'
import { departmentsApi } from '../../../../hooks/api/departmentsApi'
import { roleApi } from '../../../../hooks/api/roleApi'
import { userApi } from '../../../../hooks/api/userApi'
import { sucessMessage, errorMessage } from '../../../../utils/Toast/toast'

const USER_INITIAL_STATE = {
  name: '',
  email: '',
  companyId: '',
  cpf: '',
  roleId: '',
  departmentId: '',
}

interface AddUserModalProps {
  isOpen: boolean
  setIsOpen: (IsOpen: boolean) => void
}

function AddUserModal({ isOpen, setIsOpen }: AddUserModalProps) {
  const companyService = companyApi()
  const roleService = roleApi()
  const userService = userApi()
  const departmentService = departmentsApi()

  const [userInfo, setUserInfo] = useState({ ...USER_INITIAL_STATE })
  const [allCompanies, setAllCompanies] = useState<any>([])
  const [allRoles, setAllRoles] = useState<any>([])
  const [allDepartments, setAllDepartments] = useState<any>([])

  const getCompanies = async () => {
    const companies = await companyService.getAllCompanies()

    setAllCompanies(companies)
  }

  const getAllRoles = async () => {
    const roles = await roleService.getAllRoles()

    const filteredRoles = _.filter(roles, role => role.name !== 'SUPER_ADMIN')

    setAllRoles(filteredRoles)
  }

  const handleCreateUser = async () => {
    const response = await userService.createUser(userInfo)

    if (response) {
      setIsOpen(false)
      return sucessMessage(translate(`${response?.message}`))
    }

    return errorMessage(translate('user_not_created'))
  }

  const getAllDepartmentsByCompanyId = async () => {
    const departments = await departmentService.getDepartmentsByCompanyId(userInfo?.companyId)

    setAllDepartments(departments)
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    property: string,
  ) => {
    setUserInfo((prevState: typeof userInfo) => ({
      ...prevState,
      [property]: event.target.value,
    }))
  }

  useEffect(() => {
    setUserInfo({ ...USER_INITIAL_STATE })
  }, [isOpen])

  useEffect(() => {
    getCompanies()
    getAllRoles()
    getAllDepartmentsByCompanyId()
  }, [])

  return (
    <Modal isOpen={isOpen}>
      <div className="m-3">
        <button onClick={() => setIsOpen(false)} className="float-right">
          <X size={24} color="#030303" />
        </button>

        <h1 className="text-2xl mb-2">{translate('user.add_modal.title')}</h1>
        <span>{translate('user.add_modal.info')}</span>
      </div>
      <hr />

      <ModalBody>
        <div>
          <form>
            <div className="grid grid-cols-2 gap-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="name"
                  text={translate('user.user_name')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={userInfo?.name}
                  onChange={event => handleChange(event, 'name')}
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  text={translate('user.email')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="email"
                  name="email"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={userInfo?.email}
                  onChange={event => handleChange(event, 'email')}
                />
              </div>

              <div>
                <Label
                  htmlFor="cpf"
                  text={translate('user.cpf')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="cpf"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={userInfo?.cpf}
                  onChange={event => handleChange(event, 'cpf')}
                />
              </div>

              <div>
                <Label
                  htmlFor="corporateName"
                  text={translate('user.company.corporate_name')}
                  className="text-base mb-1"
                />
                <Select
                  options={allCompanies}
                  id="company"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={userInfo?.companyId}
                  onChange={event => handleChange(event, 'companyId')}
                />
              </div>

              <div>
                <Label
                  htmlFor="department"
                  text={translate('user.department')}
                  className="text-base mb-1"
                />
                <Select
                  options={allDepartments}
                  id="department"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={userInfo?.departmentId}
                  onChange={event => handleChange(event, 'departmentId')}
                  disabled={!userInfo?.companyId}
                />
              </div>

              <div>
                <Label
                  htmlFor="roles"
                  text={translate('user.roles')}
                  className="text-base mb-1"
                />
                <Select
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={allRoles}
                  value={userInfo?.roleId}
                  onChange={event => handleChange(event, 'roleId')}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <div>
                <Button onClick={handleCreateUser} type="button">
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

export { AddUserModal }

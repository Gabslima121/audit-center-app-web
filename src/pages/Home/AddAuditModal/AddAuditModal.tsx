import { X } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import { Button } from '../../../components/Button/Button'
import { Select } from '../../../components/Select/Select'
import { Input } from '../../../components/Input/Input'
import { Label } from '../../../components/Label/Label'
import { userApi } from '../../../hooks/api/userApi'
import { departmentsApi } from '../../../hooks/api/departmentsApi'
import { AUDIT_STATUS } from '../../../helpers/constants'
import { companyApi } from '../../../hooks/api/companyApi'
import { auditApi } from '../../../hooks/api/auditApi'
import { errorMessage, sucessMessage } from '../../../utils/Toast/toast'
import translate from '../../../helpers/translate'
interface AddAuditModalProps {
  isOpen: boolean
  setIsOpen: (IsOpen: boolean) => void
}

function AddAuditModal({ isOpen, setIsOpen }: AddAuditModalProps) {
  const userService = userApi()
  const departmentsService = departmentsApi()
  const companyService = companyApi()
  const auditService = auditApi()
  const [title, setTitle] = useState('')
  const [responsible, setResponsible] = useState('')
  const [responsableArea, setResponsableArea] = useState('')
  const [analyst, setAnalyst] = useState('')
  const [statusSelect, setStatusSelect] = useState('')
  const [status, setStatus] = useState<object[]>([])
  const [sla, setSla] = useState('')
  const [company, setCompany] = useState('')
  const [openDate, setOpenDate] = useState('')
  const [limitDate, setLimitDate] = useState('')
  const [description, setDescription] = useState('')
  const [userList, setUserList] = useState([])
  const [departmentsList, setDepartmentsList] = useState([])
  const [companyList, setCompanyList] = useState([])

  async function getAllUsers() {
    const users = await userService.getAllUsers()

    setUserList(users)
  }

  async function getAllDepartments() {
    const departments = await departmentsService.getAllDepartments()

    setDepartmentsList(departments)
  }

  async function getAllCompanies() {
    const companies = await companyService.getAllCompanies()

    setCompanyList(companies)
  }

  async function handleSubmitNewAudit() {
    try {
      await auditService.createAudit({
        title,
        responsible,
        responsableArea,
        analyst,
        status: statusSelect,
        sla,
        company,
        openDate,
        limitDate,
        description,
      })

      setIsOpen(false)
      return sucessMessage(translate('success'))
    } catch (error: any) {
      return errorMessage(translate(`${error?.response?.data?.message}`))
    }
  }

  useEffect(() => {
    setStatus(AUDIT_STATUS)
    getAllUsers()
    getAllDepartments()
    getAllCompanies()
    // console.log(depar)
  }, [])

  return (
    <Modal isOpen={isOpen}>
      <div className="m-3">
        <button onClick={() => setIsOpen(false)} className="float-right">
          <X size={24} color="#030303" />
        </button>

        <h1 className="text-2xl mb-2">Criação de Auditorias</h1>
        <span>
          Preencha as informações abaixo para cadastrar uma nova auditoria
        </span>
      </div>
      <hr />

      <ModalBody>
        <div className="grid grid-rows-1 mb-2">
          <Label htmlFor="title" text="Título" className="text-xs mb-1" />
          <Input
            id="title"
            placeholder="Título"
            className="bg-input p-2 rounded-lg w-full"
            type="text"
            onChange={e => setTitle(e?.target?.value)}
          />
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label
              htmlFor="responsible"
              text="Responsável"
              className="text-xs mb-1"
            />
            <Select
              className="bg-input p-2 rounded-lg w-52"
              id="responsible"
              options={userList}
              onChange={e => setResponsible(e?.target?.value)}
              htmlFor="responsible"
            />
          </div>

          <div>
            <Label
              htmlFor="responsableArea"
              text="Área Responsável"
              className="text-xs mb-1"
            />
            <Select
              className="bg-input p-2 rounded-lg w-52"
              id="responsableArea"
              options={departmentsList}
              onChange={e => setResponsableArea(e?.target?.value)}
              htmlFor="responsableArea"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label htmlFor="analyst" text="Analista" className="text-xs mb-1" />
            <Select
              id="analyst"
              className="bg-input p-2 rounded-lg w-52"
              options={userList}
              onChange={e => setAnalyst(e?.target?.value)}
            />
          </div>

          <div>
            <Label htmlFor="status" text="Status" className="text-xs mb-1" />
            <Select
              id="status"
              className="bg-input p-2 rounded-lg w-52"
              options={status}
              onChange={e => setStatusSelect(e?.target?.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label htmlFor="sla" text="Definir SLA" className="text-xs mb-1" />
            <Input
              id="sla"
              placeholder="SLA"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
              onChange={e => setSla(e?.target?.value)}
            />
          </div>

          <div>
            <Label htmlFor="company" text="Empresa" className="text-xs mb-1" />
            <Select
              id="company"
              className="bg-input p-2 rounded-lg w-52"
              options={companyList}
              onChange={e => setCompany(e?.target?.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label
              htmlFor="openDate"
              text="Data de Abertura"
              className="text-xs mb-1"
            />
            <Input
              id="openDate"
              className="bg-input p-2 rounded-lg w-52"
              type="date"
              onChange={e => setOpenDate(e?.target?.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="limitDate"
              text="Data Limite para Resolução"
              className="text-xs mb-1"
            />
            <Input
              id="limitDate"
              className="bg-input p-2 rounded-lg w-52"
              type="date"
              onChange={e => setLimitDate(e?.target?.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mb-2">
          <div>
            <Label
              htmlFor="description"
              text="Considerações/Descrição"
              className="text-xs mb-1"
            />
            <textarea
              id="description"
              className="bg-input p-2 rounded-lg w-full"
              placeholder="Considerações/Descrição"
              onChange={e => setDescription(e?.target?.value)}
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        <Button onClick={handleSubmitNewAudit}>Cadastrar Auditoria</Button>
      </ModalFooter>
    </Modal>
  )
}

export { AddAuditModal }

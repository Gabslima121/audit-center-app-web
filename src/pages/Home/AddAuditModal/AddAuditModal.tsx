import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from '../../../components/Button/Button'
import { Select } from '../../../components/Select/Select'
import { Input } from '../../../components/Input/Input'
import { Label } from '../../../components/Label/Label'
import { userApi } from '../../../hooks/api/userApi'

interface AddAuditModalProps {
  isOpen: boolean
  setIsOpen: (IsOpen: boolean) => void
}

function AddAuditModal({ isOpen, setIsOpen }: AddAuditModalProps) {
  const userService = userApi()
  const [title, setTitle] = useState('')
  const [responsible, setResponsible] = useState('')
  const [responsibleArea, setResponsibleArea] = useState('')
  const [analyst, setAnalyst] = useState('')
  const [status, setStatus] = useState('')
  const [sla, setSla] = useState('')
  const [company, setCompany] = useState('')
  const [openDate, setOpenDate] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [description, setDescription] = useState('')
  const [userList, setUserList] = useState([])

  async function getAllUsers() {
    const users = await userService.getAllUsers()

    setUserList(users)
  }

  async function getAllDepartments(){
    
  }

  useEffect(() => {
    getAllUsers()
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
            onChange={e => setTitle(e.target.value)}
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
              onChange={e => setResponsible(e.target.value)}
              htmlFor="responsible"
            />
          </div>

          <div>
            <Label
              htmlFor="responsibleArea"
              text="Área Responsável"
              className="text-xs mb-1"
            />
            <Input
              id="responsibleArea"
              placeholder="Área Responsável"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label htmlFor="analyst" text="Analista" className="text-xs mb-1" />
            <Input
              id="analyst"
              placeholder="Analista"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
            />
          </div>

          <div>
            <Label htmlFor="status" text="Status" className="text-xs mb-1" />
            <Input
              id="status"
              placeholder="Status"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div>
            <Label htmlFor="sla" text="Definir SLA" className="text-xs mb-1" />
            <Input
              id="sla"
              placeholder="Definir SLA"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
            />
          </div>

          <div>
            <Label htmlFor="company" text="Empresa" className="text-xs mb-1" />
            <Input
              id="company"
              placeholder="Empresa"
              className="bg-input p-2 rounded-lg w-52"
              type="text"
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
            />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        <Button>Cadastrar Auditoria</Button>
      </ModalFooter>
    </Modal>
  )
}

export { AddAuditModal }

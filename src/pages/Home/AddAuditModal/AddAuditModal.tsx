import { X } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import { Button } from '../../../components/Button/Button'
import { Select } from '../../../components/Select/Select'
import { Input } from '../../../components/Input/Input'
import { Label } from '../../../components/Label/Label'
import { userApi } from '../../../hooks/api/userApi'
import { departmentsApi } from '../../../hooks/api/departmentsApi'
import { AUDIT_STATUS_ARRAY } from '../../../helpers/constants'
import { companyApi } from '../../../hooks/api/companyApi'
import { auditApi } from '../../../hooks/api/auditApi'
import { errorMessage, sucessMessage } from '../../../utils/Toast/toast'
import translate from '../../../helpers/translate'
import { slaApi } from '../../../hooks/api/slaApi'
import { CompanyContext } from '../../../contexts/Company/CompanyContext'
import { AuthContext } from '../../../contexts/Auth/AuthContext'
import { SlaType } from '../../../types/SlaType'

interface AddAuditModalProps {
  isOpen: boolean
  setIsOpen: (IsOpen: boolean) => void
}

const TICKET_INITIAL_STATE = {
  title: '',
  company: '',
  responsableArea: '',
  analyst: '',
  responsable: '',
  status: '',
  sla: '',
  openDate: '',
  limitDate: '',
  description: '',
}

function AddAuditModal({ isOpen, setIsOpen }: AddAuditModalProps) {
  const location = useLocation()
  const { selectedCompanyId, company } = useContext(CompanyContext)
  const { userCompany, userCompanyId } = useContext(AuthContext)

  const userService = userApi()
  const companyService = companyApi()
  const departmentService = departmentsApi()
  const slaService = slaApi()
  const auditService = auditApi()

  const [ticket, setTicket] = useState(TICKET_INITIAL_STATE)
  const [companyOptions, setCompanyOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])
  const [analystsOptions, setAnalystsOptions] = useState<any>([])
  const [auditorsOptions, setAuditorsOptions] = useState<any>([])
  const [slaOptions, setSlaOptions] = useState<any>([])
  const [currentUrl, setCurrentUrl] = useState([''])

  const getAllCompanies = async () => {
    const companies = await companyService.getAllCompanies()

    setCompanyOptions(companies)
  }

  const getDepartmentsByCompanyId = async () => {
    const departments = await departmentService.getDepartmentsByCompanyId(
      ticket?.company,
    )

    debugger

    setDepartmentOptions(departments)
  }

  const getUserByCompanyIdAndDepartmentId = async () => {
    const { analystArray, auditorArray } =
      await userService.getUserByCompanyIdAndDepartmentId(
        ticket?.company,
        ticket?.responsableArea,
      )
    debugger

    setAnalystsOptions(analystArray)
    setAuditorsOptions(auditorArray)
  }

  const getSlaByCompanyId = async () => {
    const sla = await slaService.getAllSlaByCompany(ticket?.company)

    const mappedSla = sla.map((item: SlaType) => {
      return {
        id: item?.id,
        name: `${item?.name} / ${item?.sla} ${item?.typeSla}`,
      }
    })

    setSlaOptions(mappedSla)
  }

  async function handleSubmitNewAudit() {
    try {
      await auditService.createAudit({
        ...ticket,
      })

      setIsOpen(false)
      return sucessMessage(translate('success'))
    } catch (error: any) {
      return errorMessage(translate(`${error?.response?.data?.message}`))
    }
  }

  const handleChangeTicketData = (
    property: string,
    event?: {
      target: { id: any; value: any }
    },
  ) => {
    const param = { [property]: event?.target?.value }

    setTicket((prevState: typeof ticket) => ({
      ...prevState,
      ...param,
    }))
  }

  useEffect(() => {
    setCurrentUrl(location.pathname.split('/'))
    setTicket({ ...TICKET_INITIAL_STATE })
  }, [location.pathname, isOpen])

  useEffect(() => {
    if (currentUrl[1] === 'company') {
      if (company) {
        const selectedCompany = [
          {
            id: company?.id,
            corporateName: company?.corporateName,
          },
        ]

        setTicket((prevState: typeof ticket) => ({
          ...prevState,
          company: selectedCompanyId,
        }))
        setCompanyOptions(selectedCompany)
        return
      }

      if (userCompany) {
        const selectedCompany = [
          {
            id: userCompany?.id,
            corporateName: userCompany?.corporateName,
          },
        ]

        setTicket((prevState: typeof ticket) => ({
          ...prevState,
          company: userCompanyId,
        }))
        setCompanyOptions(selectedCompany)
        return
      }
    }

    getAllCompanies()
  }, [isOpen])

  useEffect(() => {
    if (ticket?.company) {
      getDepartmentsByCompanyId()
      getSlaByCompanyId()
    }

    if (ticket?.responsableArea) {
      getUserByCompanyIdAndDepartmentId()
    }
  }, [ticket.company, ticket.responsableArea])

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
        <div>
          <form>
            <div className="grid grid-rows-1 mb-2">
              <Label htmlFor="title" text="Título" className="text-xs mb-1" />
              <Input
                id="title"
                placeholder={translate('ticket.title')}
                className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                type="text"
                value={ticket.title}
                onChange={e => handleChangeTicketData('title', e)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="company"
                  text={translate('ticket.company')}
                  className="text-xs mb-1"
                />
                <Select
                  id="company"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={companyOptions}
                  value={ticket?.company}
                  onChange={option => handleChangeTicketData('company', option)}
                  disabled={currentUrl[1] === 'company'}
                />
              </div>

              <div>
                <Label
                  htmlFor="responsableArea"
                  text={translate('ticket.responsableArea')}
                  className="text-xs mb-1"
                />
                <Select
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  id="responsableArea"
                  options={departmentOptions}
                  value={ticket?.responsableArea}
                  onChange={option =>
                    handleChangeTicketData('responsableArea', option)
                  }
                  htmlFor="responsableArea"
                  disabled={ticket?.company ? false : true}
                />
              </div>

              <div>
                <Label
                  htmlFor="analyst"
                  text={translate('ticket.analyst')}
                  className="text-xs mb-1"
                />
                <Select
                  id="analyst"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={analystsOptions}
                  onChange={option => handleChangeTicketData('analyst', option)}
                  disabled={
                    ticket?.company && ticket?.responsableArea ? false : true
                  }
                  value={ticket?.analyst}
                />
              </div>

              <div>
                <Label
                  htmlFor="responsable"
                  text={translate('ticket.responsable')}
                  className="text-xs mb-1"
                />
                <Select
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  id="responsable"
                  options={auditorsOptions}
                  value={ticket?.responsable}
                  onChange={option =>
                    handleChangeTicketData('responsable', option)
                  }
                  htmlFor="responsable"
                  disabled={ticket?.company ? false : true}
                />
              </div>

              <div>
                <Label
                  htmlFor="status"
                  text={translate('ticket.status')}
                  className="text-xs mb-1"
                />
                <Select
                  id="status"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={AUDIT_STATUS_ARRAY}
                  onChange={option => handleChangeTicketData('status', option)}
                  value={ticket?.status}
                />
              </div>

              <div>
                <Label
                  htmlFor="sla"
                  text={translate('ticket.sla')}
                  className="text-xs mb-1"
                />
                <Select
                  id="sla"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={slaOptions}
                  onChange={option => handleChangeTicketData('sla', option)}
                  value={ticket?.sla}
                />
              </div>

              <div>
                <Label
                  htmlFor="openDate"
                  text={translate('ticket.openDate')}
                  className="text-xs mb-1"
                />
                <Input
                  id="openDate"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  type="date"
                  onChange={() => handleChangeTicketData('openDate')}
                  value={ticket?.openDate}
                />
              </div>

              <div>
                <Label
                  htmlFor="limitDate"
                  text={translate('ticket.limitDate')}
                  className="text-xs mb-1"
                />
                <Input
                  id="limitDate"
                  className="p-2 rounded-lg w-full text-lg border-gray-400 border-1 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  type="date"
                  onChange={() => handleChangeTicketData('limitDate')}
                  value={ticket?.limitDate}
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
                  placeholder="Considerações/Descrição"
                  onChange={e => handleChangeTicketData('description', e)}
                  value={ticket?.description}
                />
              </div>
            </div>
          </form>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>{translate('cancel')}</Button>
        <Button onClick={handleSubmitNewAudit}>{translate('add_audit')}</Button>
      </ModalFooter>
    </Modal>
  )
}

export { AddAuditModal }

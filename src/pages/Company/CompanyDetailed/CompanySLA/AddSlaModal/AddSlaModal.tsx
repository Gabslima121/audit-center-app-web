import { X } from 'phosphor-react'
import { useState, useEffect, useContext } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from '../../../../../components/Button/Button'
import { Input } from '../../../../../components/Input/Input'
import { Label } from '../../../../../components/Label/Label'
import { Select } from '../../../../../components/Select/Select'
import { CompanyContext } from '../../../../../contexts/Company/CompanyContext'
import translate from '../../../../../helpers/translate'
import { companyApi } from '../../../../../hooks/api/companyApi'
import { slaApi } from '../../../../../hooks/api/slaApi'
import { sucessMessage } from '../../../../../utils/Toast/toast'

const SLA_INITIAL_STATE = {
  name: '',
  description: '',
  sla: '',
  typeSla: '',
  company: '',
}

const SLA_TYPES = [
  {
    id: 'minutes',
    name: 'Minutos',
  },
  {
    id: 'hours',
    name: 'Horas',
  },
  {
    id: 'days',
    name: 'Dias',
  },
  {
    id: 'weeks',
    name: 'Semanas',
  },
  {
    id: 'months',
    name: 'Meses',
  },
]

interface AddSlaModalProps {
  isOpen: boolean
  setIsOpen: (IsOpen: boolean) => void
}

function AddSlaModal({ isOpen, setIsOpen }: AddSlaModalProps) {
  const companyService = companyApi()
  const slaService = slaApi()
  const { selectedCompanyId, company } = useContext(CompanyContext)
  const [slaInfo, setSlaInfo] = useState({
    ...SLA_INITIAL_STATE,
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [companyOptions, setCompanyOptions] = useState<any>([])

  const handleChange = (event: { target: { id: any; value: any } }) => {
    setSlaInfo((prevState: typeof slaInfo) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  const getAllCompanies = async () => {
    const companies = await companyService.getAllCompanies()
    setCompanyOptions(companies)
  }

  const getCompanyById = async () => {
    const companyExists = await companyService.getCompanyById(selectedCompanyId)
    const selectedCompany = [
      {
        id: companyExists?.id,
        corporateName: companyExists?.corporateName,
      },
    ]

    setSlaInfo((prevState: typeof slaInfo) => ({
      ...prevState,
      company: companyExists?.id,
    }))
    setCompanyOptions(selectedCompany)
  }

  const handleCreateSla = async () => {
    await slaService.createSla(slaInfo)

    sucessMessage(translate('success'))
    setIsOpen(false)
  }

  useEffect(() => {
    if (!selectedCompanyId) {
      getAllCompanies()
      setIsDisabled(false)
    }

    if (selectedCompanyId && company) {
      getCompanyById()
    }
  }, [selectedCompanyId, company])

  useEffect(() =>{
    setSlaInfo({ ...SLA_INITIAL_STATE, company: selectedCompanyId })
  }, [isOpen])

  return (
    <Modal isOpen={isOpen}>
      <div className="m-3">
        <button onClick={() => setIsOpen(false)} className="float-right">
          <X size={24} color="#030303" />
        </button>

        <h1 className="text-2xl mb-2">{translate('sla_creation')}</h1>
        <span>{translate('sla_creation_description')}</span>
      </div>
      <hr />

      <ModalBody>
        <div>
          <form>
            <div className="grid grid-cols-2 gap-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="name"
                  text={translate('sla_name')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={slaInfo?.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  text={translate('sla_description')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="description"
                  name="description"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={slaInfo?.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="sla"
                  text={translate('sla')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="sla"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={slaInfo?.sla}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="typeSla"
                  text={translate('sla_type')}
                  className="text-base mb-1"
                />
                <Select
                  id="typeSla"
                  placeholder={translate('sla_type_placeholder')}
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={SLA_TYPES}
                  onChange={handleChange}
                  value={slaInfo?.typeSla}
                />
              </div>

              <div>
                <Label
                  htmlFor="company"
                  text={translate('sla.company')}
                  className="text-base mb-1"
                />
                <Select
                  id="company"
                  className="p-2 rounded-lg w-full text-lg border-gray-500 focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  options={companyOptions}
                  onChange={handleChange}
                  value={slaInfo?.company}
                  disabled={isDisabled}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <div>
                <Button onClick={handleCreateSla} type="button">
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

export { AddSlaModal }

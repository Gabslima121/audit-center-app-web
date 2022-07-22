import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { Input } from '../../../components/Input/Input'
import { Label } from '../../../components/Label/Label'
import { CompanyContext } from '../../../contexts/Company/CompanyContext'
import translate from '../../../helpers/translate'
import { companyApi } from '../../../hooks/api/companyApi'
import { sucessMessage, warningMessage } from '../../../utils/Toast/toast'

const COMPANY_INITIAL_STATE = {
  corporateName: '',
  cnpj: '',
  cep: '',
  city: '',
  state: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  description: '',
}

function CompanyDetailed() {
  const companyService = companyApi()
  const { company, companyId } = useContext(CompanyContext)
  const [companyInfo, setCompanyInfo] = useState({
    ...COMPANY_INITIAL_STATE,
  })

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setCompanyInfo((prevState: typeof companyInfo) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleUpdateCompany = async () => {
    const {
      corporateName,
      cnpj,
      description,
      cep,
      city,
      state,
      street,
      number,
      complement,
      neighborhood,
    } = companyInfo

    try {
      await companyService.updateCompanyById(companyId, {
        corporateName,
        cnpj,
        cep,
        city,
        state,
        street,
        number,
        complement,
        neighborhood,
        description,
      })

      return sucessMessage(translate('success'))
    } catch (error: any) {
      return warningMessage(translate(`${error?.response?.data?.message}`))
    }
  }

  useEffect(() => {
    setCompanyInfo(company)
  }, [companyInfo, company])

  return (
    <div className="flex-auto mt-5">
      <div className="mt-11 bg-gray-100 rounded-lg p-2 shadow-3xl">
        <div>
          <b>
            <h1 className="text-2xl">
              Dados da Empresa {company?.corporateName}{' '}
            </h1>
          </b>

          <hr className="mt-2" />
        </div>

        <div className="mt-4">
          <form>
            <div className="grid grid-cols-3 gap-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="corporateName"
                  text={translate('company.corporate_name')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="corporateName"
                  name="corporateName"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.corporateName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="cnpj"
                  text={translate('company.cnpj')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.cnpj}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="state"
                  text={translate('company.state')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="state"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.state}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="city"
                  text={translate('company.city')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="city"
                  name="city"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="street"
                  text={translate('company.street')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="street"
                  name="street"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.street}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="number"
                  text={translate('company.number')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="number"
                  name="number"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.number}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="neighborhood"
                  text={translate('company.neighborhood')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.neighborhood}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="complement"
                  text={translate('company.complement')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="complement"
                  name="complement"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.complement}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label
                  htmlFor="description"
                  text={translate('company.description')}
                  className="text-base mb-1"
                />

                <Input
                  type="text"
                  id="description"
                  name="description"
                  className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
                  value={companyInfo?.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <div>
                <Button onClick={handleUpdateCompany} type="button">
                  {translate('save_informations')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { CompanyDetailed }

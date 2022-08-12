import { useContext, useEffect, useState } from 'react'

import { companyApi } from '../../hooks/api/companyApi'
import { CompanyType } from '../../types/Company/CompanyType'
import { setLocalStorage } from '../../utils/localStorage'
import { AuthContext } from '../Auth/AuthContext'
import { CompanyContext } from './CompanyContext'

export const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const companyService = companyApi()
  const { isAuditor, user, companyId } = useContext(AuthContext)
  const [selectedCompanyId, setSelectedCompanyId] = useState('') as [
    string,
    (selectedCompanyId: string | null) => void,
  ]
  const [company, setCompany] = useState() as [
    CompanyType,
    (company: CompanyType | null) => void,
  ]

  //TODO - Fazer o contexto da company

  const getCompanyById = async () => {
    const companyExists = await companyService.getCompanyById(selectedCompanyId)

    if (companyExists) {
      setCompany(companyExists)
      localStorage.setItem('company', JSON.stringify(companyExists))
    }
  }

  // const handleSetUserCompanyId = () => {
    
  // }

  useEffect(() => {
    if (selectedCompanyId) {
      getCompanyById()
      setLocalStorage('companyId', selectedCompanyId)
      return
    }

    if (isAuditor) {
      console.log(isAuditor)
      setSelectedCompanyId(companyId)
      setLocalStorage('companyId', companyId)
      return
    }
  }, [user, selectedCompanyId])

  return (
    <CompanyContext.Provider
      value={{
        selectedCompanyId,
        company,
        setSelectedCompanyId,
        setCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

import { useContext, useEffect, useState } from 'react'

import { companyApi } from '../../hooks/api/companyApi'
import { CompanyType } from '../../types/CompanyType'
import { AuthContext } from '../Auth/AuthContext'
import { CompanyContext } from './CompanyContext'

export const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const companyService = companyApi()
  const [companyId, setCompanyId] = useState('') as [
    string,
    (companyId: string | null) => void,
  ]
  const [company, setCompany] = useState() as [
    CompanyType,
    (company: CompanyType | null) => void,
  ]

  //TODO - Fazer o contexto da company

  const getCompanyById = async () => {
    const companyExists = await companyService.getCompanyById(companyId)

    if (companyExists) {
      setCompany(companyExists)
      localStorage.setItem('company', JSON.stringify(companyExists))
    }
  }

  useEffect(() => {
    console.log(companyId)
    if (companyId) {
      getCompanyById()
      localStorage.setItem('companyId', companyId)
    }
  }, [companyId])

  return (
    <CompanyContext.Provider
      value={{
        companyId,
        company,
        setCompanyId,
        setCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

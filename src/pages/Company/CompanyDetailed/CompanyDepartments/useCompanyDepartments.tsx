import { useContext, useEffect, useState } from 'react'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import { departmentsApi } from '../../../../hooks/api/departmentsApi'

const useComanpyDepartments = () => {
  const { selectedCompanyId } = useContext(CompanyContext)
  const departmentService = departmentsApi()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [departments, setDepartments] = useState<any>([])

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const getDepartmentsByCompanyId = async () => {
    const departments = await departmentService.getDepartmentsByCompanyId(
      selectedCompanyId,
    )

    setDepartments(departments)
  }

  useEffect(() => {
    getDepartmentsByCompanyId()
  }, [modalIsOpen])

  return {
    handleOpenModal,
    modalIsOpen,
    setModalIsOpen,
    departments,
    getDepartmentsByCompanyId,
  }
}

export { useComanpyDepartments }

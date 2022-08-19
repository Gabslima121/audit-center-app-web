import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { Button } from '../../../../components/Button/Button'
import { CompanyDepartmentsTable } from '../../../../components/CompanyDepartments/CompanyDepartmentsTable'
import { Container } from '../../../../components/Container/Container'
import { Loading } from '../../../../components/Loading/Loading'
import translate from '../../../../helpers/translate'
import { AddDepartmentModal } from './AddDepartmentModal/AddDepartmentModal'
import { useComanpyDepartments } from './useCompanyDepartments'

function CompanyDepartments() {
  const { handleOpenModal, modalIsOpen, setModalIsOpen, departments } =
    useComanpyDepartments()

  useEffect(() => {
    console.log(departments)
  }, [departments])

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>
            {translate('department.create_department')}
          </Button>
        </div>

        <AddDepartmentModal
          isOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
        />

        <h1 className="text-3xl	text-white">{translate('departments')}</h1>
      </div>

      <Container>
        {isEmpty(departments) ? (
          <Loading />
        ) : (
          <CompanyDepartmentsTable departments={departments} />
        )}
      </Container>
    </div>
  )
}

export { CompanyDepartments }

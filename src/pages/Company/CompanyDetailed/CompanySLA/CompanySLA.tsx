import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../components/Button/Button'
import { CompanySlaTable } from '../../../../components/CompanySlaTable/CompanySlaTable'
import { Container } from '../../../../components/Container/Container'
import { Loading } from '../../../../components/Loading/Loading'
import { CompanyContext } from '../../../../contexts/Company/CompanyContext'
import translate from '../../../../helpers/translate'
import { slaApi } from '../../../../hooks/api/slaApi'
import { AddSlaModal } from './AddSlaModal/AddSlaModal'

function CompanySLA() {
  const { selectedCompanyId } = useContext(CompanyContext)
  const slaService = slaApi()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [sla, setSla] = useState([])

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  const getAllSlaByCompany = async () => {
    const slaData = await slaService.getAllSlaByCompany(selectedCompanyId)

    setSla(slaData)
  }

  useEffect(() => {
    getAllSlaByCompany()
  }, [modalIsOpen])

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>{translate('create_sla')}</Button>
        </div>

        <AddSlaModal isOpen={modalIsOpen} setIsOpen={handleCloseModal} />

        <h1 className="text-3xl	text-white">{translate('sla')}</h1>
      </div>

      <Container>
        {_.isEmpty(sla) ? <Loading /> : <CompanySlaTable sla={sla} />}
      </Container>
    </div>
  )
}

export { CompanySLA }

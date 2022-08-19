import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { Button } from '../../../../components/Button/Button'
import { CompanyTicketsTable } from '../../../../components/CompanyTicketsTable/CompanyTicketsTable'
import { Loading } from '../../../../components/Loading/Loading'
import { AuthContext } from '../../../../contexts/Auth/AuthContext'
import translate from '../../../../helpers/translate'
import { AddAuditModal } from '../../../Home/AddAuditModal/AddAuditModal'
import { useCompanyTickets } from './useCompanyTickets'

function CompanyTickets() {
  const { tickets, modalIsOpen, handleCloseModal, handleOpenModal } =
    useCompanyTickets()
  const { isAnalyst } = useContext(AuthContext)

  return (
    <div className="flex-auto mt-5">
      <div>
        {!isAnalyst && (
          <>
            <div className="float-right">
              <Button onClick={handleOpenModal}>
                {translate('create_audit')}
              </Button>
            </div>

            <AddAuditModal isOpen={modalIsOpen} setIsOpen={handleCloseModal} />
          </>
        )}

        <h1 className="text-3xl	text-white">{translate('menu.tickets')}</h1>
      </div>

      <div className="mt-11 bg-gray-100 rounded-lg p-2 shadow-3xl">
        {_.isEmpty(tickets) ? (
          <Loading />
        ) : (
          <CompanyTicketsTable tickets={tickets} />
        )}
      </div>
    </div>
  )
}

export { CompanyTickets }

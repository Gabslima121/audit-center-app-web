import { useLocation } from 'react-router-dom'
import { TicketDetailed } from '../../../Home/Tickets/TicketDetailed/TicketDetailed'

function CompanyTicketsEdit() {
  const location = useLocation()
  const currentUrl = location.pathname

  return <TicketDetailed currentUrl={currentUrl} />
}

export { CompanyTicketsEdit }

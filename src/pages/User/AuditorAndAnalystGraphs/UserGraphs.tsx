import { Container } from '../../../components/Container/Container'
import translate from '../../../helpers/translate'
import { TicketByStatus } from './Graphs/TicketsByStatus'
import { useUserGraphs } from './useUserGraphs'

function UserGraphs() {
  const { userTicketsByStatus } = useUserGraphs()

  return (
    <div className="flex-auto mt-5">
      <div>
        <h1 className="text-3xl	text-white">{translate('graphs')}</h1>
      </div>

      <Container>
        <div className="overflow-y-scroll flex flex-col h-full">
          <div>
            <h1 className="text-3xl m-2">
              {translate('graphs.user.total_audits')}
            </h1>
            <TicketByStatus config={userTicketsByStatus} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export { UserGraphs }

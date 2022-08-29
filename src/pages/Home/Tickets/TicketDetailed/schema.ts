const TICKET_INITIAL_STATE = {
  id: '',
  title: '',
  responsable: {
    name: '',
    id: '',
  },
  responsableArea: {
    name: '',
    id: '',
  },
  analyst: {
    name: '',
    id: '',
  },
  status: '',
  sla: {
    name: '',
    id: '',
  },
  openDate: new Date,
  limitDate: new Date,
  description: '',
  company: {
    corporateName: '',
    id: '',
  },
  closeDate: '',
}

const TICKET_ITEM_INITIAL_STATE = [
  {
    id: '',
    status: '',
    description: '',
    item: '',
  },
]

export { TICKET_INITIAL_STATE, TICKET_ITEM_INITIAL_STATE }

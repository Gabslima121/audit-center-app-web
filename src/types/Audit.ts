export interface Tickets {
  id: string
  title: string
  responsableId: string
  responsableAreaId: string
  analystId: string
  status: string
  companyId: string
  openDate: Date
  limitDate: Date
  closeDate: Date
  description: string
  slaId: string
}

export interface AllTicketsByMainStatus {
  pendingTickets: Tickets[]
  openTickets: Tickets[]
  doneTickets: Tickets[]
  inProgressTickets: Tickets[]
}

export interface MountTicketsByStatusChart {
  status: string
  total: number
}

export interface MountTicketsByDepartmentsChart {
  department: {
    name: string
  }
  total: number
}

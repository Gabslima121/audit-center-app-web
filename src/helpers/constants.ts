import { RoleItemType } from '../types/RolesType'

export const USER_ROLES: RoleItemType[] = [
  {
    name: 'SUPER_ADMIN',
  },
  {
    name: 'ADMIN',
  },
  {
    name: 'AUDITOR',
  },
  {
    name: 'ANALYST',
  },
]

export const AUDIT_STATUS_ARRAY = [
  {
    name: 'OPEN',
  },
  {
    name: 'DONE',
  },
  {
    name: 'PENDING',
  },
  {
    name: 'IN PROGRESS',
  },
  {
    name: 'CANCELED',
  },
  {
    name: 'REVIEW',
  },
]

export const AUDIT_STATUS = {
  OPEN: 'OPEN',
  DONE: 'DONE',
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN PROGRESS',
  CANCELED: 'CANCELED',
  REVIEW: 'REVIEW',
}

export const AUDIT_ITEMS_STATUS: object[] = [
  {
    name: 'PENDING',
  },
  {
    name: 'IN_PROGRESS',
  },
  {
    name: 'DONE',
  },
  {
    name: 'CANCELED',
  },
]

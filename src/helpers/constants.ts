import { RoleItemType } from "../types/RolesType"

export const USER_ROLES: RoleItemType[] = [
  {
    name: "SUPER_ADMIN"
  },
  {
    name: "ADMIN"
  },
  {
    name: "AUDITOR"
  },
  {
    name: "ANALYST"
  },
]

export const AUDIT_STATUS: object[] = [
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

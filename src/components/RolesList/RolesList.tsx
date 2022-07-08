import _ from 'lodash'
import { useMemo, useState } from 'react'
import { USER_ROLES } from '../../helpers/constants'
import { Label } from '../Label/Label'
import { RoleItem } from './RoleItem'

interface RolesListProps {
  id?: string
  className?: string
  userRoles: any
  title?: string
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function RolesList(props: RolesListProps) {
  const { userRoles, title } = props

  return (
    <div className="border-1 border-gray-500 border-solid rounded-lg mr-2 p-2 h-auto">
      <div className="items-center justify-center">
        <Label className="self-center" text={title} />
      </div>

      {_.map(userRoles, roles => (
        <RoleItem role={roles} id={_.get(roles, 'id')} />
      ))}
    </div>
  )
}

export { RolesList }

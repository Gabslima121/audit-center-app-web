import _ from 'lodash'
import { useMemo } from 'react'
import { RoleItemType } from '../../types/RolesType'

interface RoleItemProps {
  role: RoleItemType
  onChange?: (e: any) => void
  id: string
}

function RoleItem({ role, onChange }: RoleItemProps) {
  const roleName = useMemo(() => _.get(role, 'name'), [role])

  // const handleSelectCompany = () => {
  //   onChange(_.get(role, 'id'))
  // }

  return (
    <div className="border-1 rounded-lg border-solid border-gray-500 mb-2">
      <div className="flex flex-row items-center justify-center p-2">
        <span className="text-xs h-auto w-auto" >
          {roleName}
        </span>
      </div>
    </div>
  )
}

export { RoleItem }

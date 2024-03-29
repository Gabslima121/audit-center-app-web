import { useEffect } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useLocation } from 'react-router-dom'

import translate from '../../helpers/translate'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Label } from '../Label/Label'
import { useFormUser } from './useFormEditUser'

function FormEditUser() {
  const location = useLocation()
  const { userInfo, setCurrentUrl, roleOptions, userRole, totalAudits } = useFormUser()

  useEffect(() => {
    setCurrentUrl(location.pathname.split('/'))
  }, [location])

  return (
    <div className="mt-4">
      <form>
        <div className="grid grid-cols-3 gap-3 ml-2 mb-4">
          <div>
            <Label
              htmlFor="name"
              text={translate('user.user_name')}
              className="text-base mb-1"
            />
            <Input
              type="text"
              id="name"
              name="name"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
              value={userInfo?.name}
              // onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              text={translate('user.email')}
              className="text-base mb-1"
            />
            <Input
              type="text"
              id="email"
              name="email"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50"
              value={userInfo?.email}
              // onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="cpf"
              text={translate('user.cpf')}
              className="text-base mb-1 opacity-60"
            />
            <Input
              type="text"
              id="cpf"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
              value={userInfo?.cpf}
              disabled={true}
            />
          </div>

          <div>
            <Label
              htmlFor="roles"
              text={translate('user.roles')}
              className="text-base mb-1 opacity-60"
            />
            {/* <span className="ml-1 opacity-60">{`(${selectedRoles.length})`}</span> */}
            <MultiSelect
              className="text-lg w-full  mr-2 opacity-80"
              options={roleOptions}
              value={userRole}
              disabled={true}
              labelledBy={''}
            />
          </div>

          <div>
            <Label
              htmlFor="totalAudits"
              text={translate('user.total_audits')}
              className="text-base mb-1 opacity-60"
            />
            <Input
              type="text"
              id="totalAudits"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
              disabled={true}
              value={totalAudits}
            />
          </div>

          <div>
            <Label
              htmlFor="totalDoneAudits"
              text={translate('user.total_done_audits')}
              className="text-base mb-1 opacity-60"
            />
            <Input
              type="text"
              id="totalDoneAudits"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
              disabled={true}
              // value={totalWithStatus}
            />
          </div>

          <div>
            <Label
              htmlFor="company"
              text={translate('user.company')}
              className="text-base mb-1 opacity-60"
            />
            <Input
              type="text"
              id="company"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
              disabled={true}
              value={userInfo?.companies?.corporateName}
            />
          </div>

          <div>
            <Label
              htmlFor="department"
              text={translate('user.department')}
              className="text-base mb-1 opacity-60"
            />
            <Input
              type="text"
              id="department"
              className="p-2 rounded-lg w-full text-lg border-gray-100 border-1 border focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-opacity-50 opacity-60"
              disabled={true}
              value={userInfo?.department?.name}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div>
            <Button
              type="button"
              // onClick={handleUpdateUserInfo}
            >
              {translate('save_informations')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { FormEditUser }

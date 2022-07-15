import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

import { Input } from '../../components/Input/Input'
import { Label } from '../../components/Label/Label'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import translate from '../../helpers/translate'
import { auditApi } from '../../hooks/api/auditApi'
import { roleApi } from '../../hooks/api/roleApi'
import { AUDIT_STATUS } from '../../helpers/constants'
import { Button } from '../../components/Button/Button'

function MyProfile() {
  const roleService = roleApi()
  const ticketService = auditApi()
  const { roles, user } = useContext(AuthContext)
  const [allRoles, setAllRoles] = useState<any>([])
  const [selectedRoles, setSelectedRoles] = useState<any>([])
  const [totalWithNoStatus, setTotalWithNoStatus] = useState<number>(0)
  const [totalWithStatus, setTotalWithStatus] = useState<number>(0)
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  async function getAllRoles() {
    const allRole = await roleService.getAllRoles()

    const mappedRoles = roleService.mapRolesToSelect(allRole)

    setAllRoles(mappedRoles)
  }

  function getSelectedRoles() {
    const mappedRoles = roleService.mapRolesToSelect(roles)

    setSelectedRoles(mappedRoles)
  }

  async function getNumberOfTotalTicketsWithNoStatus() {
    const { total } = await ticketService.getAuditByResponsable()

    setTotalWithNoStatus(total)
  }

  async function getNumberOfTotalTicketsWithStatus() {
    const { total } = await ticketService.getAuditByResponsable(
      AUDIT_STATUS.DONE,
    )

    setTotalWithStatus(total)
  }

  async function handleUpdateUserInfo() {}

  useEffect(() => {
    getAllRoles()
    getSelectedRoles()
    getNumberOfTotalTicketsWithNoStatus()
    getNumberOfTotalTicketsWithStatus()
  }, [])

  return (
    <div className="flex-auto mt-5">
      <div className="mt-11 bg-white rounded-lg p-2">
        <div>
          <b>
            <h1 className="text-2xl	text-black">Meu Perfil</h1>
          </b>

          <hr className="mt-2" />
        </div>

        <div className="mt-4">
          <form onSubmit={handleUpdateUserInfo}>
            <div className="grid grid-cols-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="name"
                  text={translate('user.user_name')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="name"
                  className="p-2 rounded-lg w-60 text-xs"
                  value={user?.name}
                  onChange={e => setFullName(e?.target?.value)}
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
                  className="p-2 rounded-lg w-60 text-xs"
                  value={user?.email}
                  onChange={e => setEmail(e?.target?.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="cpf"
                  text={translate('user.cpf')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="cpf"
                  className="p-2 rounded-lg w-60 text-xs"
                  value={user?.cpf}
                  disabled={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 ml-2 mb-4">
              <div>
                <Label
                  htmlFor="roles"
                  text={translate('user.roles')}
                  className="text-base mb-1"
                />
                {`${selectedRoles.length}/${allRoles.length}`}
                <MultiSelect
                  id="roles"
                  className="text-xs mr-2"
                  options={allRoles}
                  value={selectedRoles}
                  onChange={(selected: any) => setSelectedRoles(selected)}
                  labelledBy={'roles'}
                  hasSelectAll={false}
                />
              </div>

              <div>
                <Label
                  htmlFor="totalAudits"
                  text={translate('user.total_audits')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="totalAudits"
                  className="p-2 rounded-lg w-60 text-xs"
                  value={totalWithNoStatus}
                  disabled={true}
                />
              </div>

              <div>
                <Label
                  htmlFor="totalDoneAudits"
                  text={translate('user.total_done_audits')}
                  className="text-base mb-1"
                />
                <Input
                  type="text"
                  id="totalDoneAudits"
                  className="p-2 rounded-lg w-60 text-xs"
                  value={totalWithStatus}
                  disabled={true}
                />
              </div>
            </div>

            <div className="flex w-32 ml-save-user-info">
              <Button type="submit">Salvar Informações</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { MyProfile }

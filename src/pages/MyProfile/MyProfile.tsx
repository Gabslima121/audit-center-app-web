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
import { Container } from '../../components/Container/Container'
import { userApi } from '../../hooks/api/userApi'

const USER_INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
}

function MyProfile() {
  const roleService = roleApi()
  const ticketService = auditApi()
  const userService = userApi()
  const { roles, user } = useContext(AuthContext)
  const [allRoles, setAllRoles] = useState<any>([])
  const [selectedRoles, setSelectedRoles] = useState<any>([])
  const [totalWithNoStatus, setTotalWithNoStatus] = useState<number>(0)
  const [totalWithStatus, setTotalWithStatus] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<any>({ ...USER_INITIAL_STATE })

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

  async function handleUpdateUserInfo() {
    const { id: userId } = user
    const { name, email } = userInfo

    const { message } = await userService.updateUser({ userId, name, email })

    console.log(message)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setUserInfo((prevState: typeof userInfo) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    setUserInfo({ ...user })
    getAllRoles()
    getSelectedRoles()
    getNumberOfTotalTicketsWithNoStatus()
    getNumberOfTotalTicketsWithStatus()
  }, [])

  return (
    <div className="flex-auto mt-5">
      <Container>
        <div>
          <b>
            <h1 className="text-2xl	text-black">Meu Perfil</h1>
          </b>

          <hr className="mt-2" />
        </div>

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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  value={user?.cpf}
                  disabled={true}
                />
              </div>

              <div>
                <Label
                  htmlFor="roles"
                  text={translate('user.roles')}
                  className="text-base mb-1 opacity-60"
                />
                <span className="ml-1 opacity-60">{`(${selectedRoles.length})`}</span>
                <MultiSelect
                  className="text-lg w-full  mr-2 opacity-80"
                  options={allRoles}
                  value={selectedRoles}
                  onChange={(selected: any) => setSelectedRoles(selected)}
                  labelledBy={'roles'}
                  hasSelectAll={false}
                  disabled={true}
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
                  value={totalWithNoStatus}
                  disabled={true}
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
                  value={totalWithStatus}
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <div>
                <Button type="button" onClick={handleUpdateUserInfo}>
                  Salvar Informações
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export { MyProfile }

import { useContext, useEffect, useState } from 'react'
import { Input } from '../../components/Input/Input'
import { Label } from '../../components/Label/Label'
import { RolesList } from '../../components/RolesList/RolesList'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import translate from '../../helpers/translate'
import { roleApi } from '../../hooks/api/roleApi'

function MyProfile() {
  const roleService = roleApi()
  const { roles, user } = useContext(AuthContext)
  const [allRoles, setAllRoles] = useState([])

  async function getAllRoles() {
    const roles = await roleService.getAllRoles()

    setAllRoles(roles)
  }

  useEffect(() => {
    getAllRoles()
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
          <form>
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
                />
              </div>
            </div>

            <div className="flex grid-cols-2 ml-2">
              <div>
                <RolesList
                  userRoles={allRoles}
                  title={translate('roles.default_title')}
                />
              </div>
              <div>
                <RolesList
                  userRoles={roles}
                  title={translate('roles.user_title')}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export { MyProfile }

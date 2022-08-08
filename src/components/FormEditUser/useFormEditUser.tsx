import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { AUDIT_STATUS } from '../../helpers/constants'
import translate from '../../helpers/translate'
import { auditApi } from '../../hooks/api/auditApi'
import { roleApi } from '../../hooks/api/roleApi'
import { userApi } from '../../hooks/api/userApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'

const USER_INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
}

const useFormEditUser = () => {
  const roleService = roleApi()
  const ticketService = auditApi()
  const userService = userApi()
  const { roles, user } = useContext(AuthContext)
  const [allRoles, setAllRoles] = useState<any>([])
  const [selectedRoles, setSelectedRoles] = useState<any>([])
  const [totalWithNoStatus, setTotalWithNoStatus] = useState<number>(0)
  const [totalWithStatus, setTotalWithStatus] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<any>({ ...USER_INITIAL_STATE })
  const [currentUrl, setCurrentUrl] = useState() as any

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

    if (message) {
      return sucessMessage(translate('success'))
    }

    return errorMessage(translate('error_to_save_informations'))
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setUserInfo((prevState: typeof userInfo) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    if (
      _.isArray(currentUrl) &&
      currentUrl[1] === 'user' &&
      currentUrl[2] === 'edit'
    ) {
      setUserInfo({})
    }
    setUserInfo({ ...user })
    getAllRoles()
    getSelectedRoles()
    getNumberOfTotalTicketsWithNoStatus()
    getNumberOfTotalTicketsWithStatus()
  }, [])

  return {
    userInfo,
    allRoles,
    selectedRoles,
    totalWithNoStatus,
    totalWithStatus,
    handleChange,
    handleUpdateUserInfo,
    setSelectedRoles,
    currentUrl,
    setCurrentUrl,
  }
}

export { useFormEditUser }

import { CodeSharp } from '@material-ui/icons'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import { AUDIT_STATUS, ROLES } from '../../helpers/constants'
import translate from '../../helpers/translate'
import { auditApi } from '../../hooks/api/auditApi'
import { roleApi } from '../../hooks/api/roleApi'
import { userApi } from '../../hooks/api/userApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'

const USER_INITIAL_STATE = {
  id: '',
  name: '',
  email: '',
  roles: [],
  cpf: '',
  companies: {
    id: '',
    corporateName: '',
  },
  department: {
    id: '',
    name: '',
  },
}

const useFormUser = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)

  const userService = userApi()
  const roleService = roleApi()
  const ticketService = auditApi()

  const [currentUrl, setCurrentUrl] = useState([''])
  const [userInfo, setUserInfo] = useState(USER_INITIAL_STATE)
  const [roleOptions, setRoleOptions] = useState([])
  const [userRole, setUserRole] = useState([])
  const [totalAudits, setTotalAudits] = useState(0)

  const getSelectedUserInfo = async () => {
    const user = await userService.getUserById(id)

    setUserInfo(user)
  }

  const getAllRoles = async () => {
    const roles = await roleService.getAllRoles()

    setRoleOptions(roles)
  }

  const mapUserRolesToSelect = () => {
    const mappedRoles = roleService.mapRolesToSelect(userInfo?.roles)

    setUserRole(mappedRoles)
  }

  const getTotalAuditsPerUser = async () => {
    const roleName = roleService.mapRoleName(userInfo?.roles)

    if (roleName === ROLES.ANALYST) {
      const analystAudits = await ticketService.getAduditsByAnalyst()
      const total = analystAudits.length

      setTotalAudits(total)
      return
    }

    if (roleName === ROLES.AUDITOR) {
      const auditorAudits = await ticketService.getAuditByResponsable()
      const total = auditorAudits.length

      setTotalAudits(total)
      return
    }
    // const tickets = await ticketService.(id)
  }

  useEffect(() => {
    if (currentUrl[1] === 'user' && currentUrl[2] === 'edit') {
      getSelectedUserInfo()
    } else {
      setUserInfo({ ...user })
    }
    getAllRoles()
  }, [currentUrl])

  useEffect(() => {
    mapUserRolesToSelect()
    getTotalAuditsPerUser()
  }, [userInfo])

  return {
    currentUrl,
    userInfo,
    setCurrentUrl,
    roleOptions,
    userRole,
    totalAudits,
  }
}

export { useFormUser }

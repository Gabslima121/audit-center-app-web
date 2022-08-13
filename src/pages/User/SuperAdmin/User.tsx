import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { Container } from '../../../components/Container/Container'
import { Loading } from '../../../components/Loading/Loading'
import {
  UserTable,
  UserTableProps,
} from '../../../components/UserTable/UserTable'
import translate from '../../../helpers/translate'
import { userApi } from '../../../hooks/api/userApi'
import { AddUserModal } from './AddUserModal/AddUserModal'

function User() {
  const userService = userApi()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [userList, setUserList] = useState([])

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  const getAllUsers = async () => {
    const users = await userService.getAllUsers()

    setUserList(users)
  }

  useEffect(() => {
    getAllUsers()
  }, [modalIsOpen])

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>{translate('add_user')}</Button>
        </div>

        <AddUserModal isOpen={modalIsOpen} setIsOpen={handleCloseModal} />

        <h1 className="text-3xl	text-white">{translate('users')}</h1>
      </div>

      <Container>
        {_.isEmpty(userList) ? <Loading /> : <UserTable user={userList} />}
      </Container>
    </div>
  )
}

export { User }

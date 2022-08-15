import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import translate from '../../helpers/translate'
import { useUserTable } from './useUserTable'
import trash from '../../assets/img/trash.svg'
import { userApi } from '../../hooks/api/userApi'
import { errorMessage, sucessMessage } from '../../utils/Toast/toast'
import { customStyles } from '../../utils/tableStyle'

export interface UserTableProps {
  user: any[]
  getAllUsers: () => void
}

function UserTable({ user, getAllUsers }: UserTableProps) {
  const userService = userApi()
  const { userHeaders, incomingUserId, modalIsOpen, setModalIsOpen } =
    useUserTable()

  const handleExcludeUser = async () => {
    const response = await userService.deleteUserById(incomingUserId)

    if (response) {
      sucessMessage(translate('user_deleted'))
      setModalIsOpen(false)
      return
    }

    errorMessage(translate('user_not_deleted'))
  }

  useEffect(() => {
    getAllUsers()
  }, [modalIsOpen])

  return (
    <>
      <DataTable
        columns={userHeaders}
        data={user}
        responsive
        highlightOnHover
        dense
        pagination={true}
        paginationTotalRows={user?.length}
        noDataComponent={translate('user.no_found')}
        customStyles={customStyles}
      />

      <div>
        <Modal isOpen={modalIsOpen} className="mt-28">
          <div className="ml-modal-trash items-center">
            <img src={trash} alt="Imagem de um lixo" />
          </div>

          <ModalBody>
            <h2 className="text-center text-2xl">
              {translate('user.confirm_delete')}
            </h2>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleExcludeUser}
              className="border-1 border-button_exclude-200 text-button_exclude-200 hover:bg-button_exclude-100 w-full p-1 rounded-md"
            >
              {translate('exclude')}
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="border-1 border-brand-100 text-brand-100 hover:bg-brand-90 w-full p-1 rounded-md"
            >
              {translate('back')}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export { UserTable }

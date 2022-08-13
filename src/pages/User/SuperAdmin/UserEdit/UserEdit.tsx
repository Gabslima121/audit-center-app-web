import { Container } from '../../../../components/Container/Container'
import { FormEditUser } from '../../../../components/FormEditUser/FormEditUser'
import translate from '../../../../helpers/translate'

function UserEdit() {
  return (
    <div className="flex-auto mt-5">
      <div>
        <h1 className="text-3xl	text-white">{translate('user.edit_info')}</h1>
      </div>

      <Container>
        <FormEditUser />
      </Container>
    </div>
  )
}

export { UserEdit }

import { useState } from 'react'
import Modal from 'react-modal'
import { X } from 'phosphor-react'

import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    width: '513px',
    height: '445px',
    marginLeft: '500px',
    marginTop: '150px',
  },
}

function Company() {
  const [modalIsOpen, setIsOpen] = useState(false)

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <div className="flex-auto mt-5">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <button onClick={handleCloseModal} className="float-right">
            <X size={24} color="#030303" />
          </button>

          <h1 className="text-2xl mb-4">Criação de Empresa</h1>
          <span>
            Preencha as informações abaixo para cadastrar uma nova empresa
          </span>
        </div>

        <div>
          <Input type="text" placeholder="Razão Social" />
        </div>
      </Modal>

      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>Cadastrar Empresa</Button>
        </div>

        <h1 className="text-3xl	text-white">Empresas</h1>
      </div>

      <div className="mt-16 bg-white rounded-lg p-2"></div>
    </div>
  )
}

export { Company }

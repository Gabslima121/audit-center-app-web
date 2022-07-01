import { useEffect, useState } from 'react'
import { X } from 'phosphor-react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Label } from '../../components/Label/Label'

function Company() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [corporateName, setCorporateName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [cep, setCep] = useState('')
  const [neibhorhood, setNeibhorhood] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  function handleOpenModal() {
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    console.log(corporateName)
    console.log(modalIsOpen)
  }, [corporateName, modalIsOpen])

  return (
    <div className="flex-auto mt-5">
      <Modal isOpen={modalIsOpen}>
        <div className="m-3">
          <button onClick={handleCloseModal} className="float-right">
            <X size={24} color="#030303" />
          </button>

          <h1 className="text-2xl mb-2">Criação de Empresa</h1>
          <span>
            Preencha as informações abaixo para cadastrar uma nova empresa
          </span>
        </div>
        <hr />

        <ModalBody>
          <div className="grid grid-cols-2 mb-2">
            <div>
              <Label
                className="text-xs"
                htmlFor="corporateName"
                text="Razão Social"
                key="corporateName"
              />
              <Input
                id="corporateName"
                placeholder="Razão Social"
                onChange={e => setCorporateName(e.target.value)}
                type="text"
                className="bg-input p-2 rounded-lg w-full"
              />
            </div>

            <div>
              <Label
                className="text-xs"
                htmlFor="cpnj"
                text="CNPJ"
                key="cpnj"
              />
              <Input
                id="cnpj"
                className="bg-input p-2 rounded-lg w-full"
                placeholder="CNPJ"
                onChange={e => setCnpj(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2">
            <div>
              <Label className="text-xs" htmlFor="cep" text="CEP" key="cep" />
              <Input
                id="cep"
                placeholder="CEP"
                onChange={e => setCep(e.target.value)}
                type="text"
                className="bg-input p-2 rounded-lg w-full"
              />
            </div>

            <div>
              <Label
                className="text-xs"
                htmlFor="state"
                text="Estado"
                key="state"
              />
              <select
                id="state"
                className="rounded-lg h-10 mt-2 w-52"
                // onChange={e => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <Label htmlFor="city" text="Cidade" className="text-xs" />
              <select
                id="city"
                className="rounded-lg h-10 mt-2 w-52"
                // onChange={e => setState(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="neibhorhood" className="text-xs" text="Bairro" />
              <Input
                id="neibhorhood"
                placeholder="Bairro"
                onChange={e => setNeibhorhood(e.target.value)}
                type="text"
                className="bg-input p-2 rounded-lg w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2">
            <div>
              <Label
                className="text-xs"
                htmlFor="street"
                text="Rua"
                key="street"
              />
              <Input
                id="street"
                placeholder="Rua"
                onChange={e => setStreet(e.target.value)}
                type="text"
                className="bg-input p-2 rounded-lg w-full"
              />
            </div>

            <div>
              <Label
                className="text-xs"
                htmlFor="number"
                text="Número"
                key="number"
              />
              <Input
                id="number"
                className="bg-input p-2 rounded-lg w-full"
                placeholder="Número"
                onChange={e => setNumber(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-2">
            <div>
              <Label
                className="text-xs"
                htmlFor="complement"
                text="Complemento"
                key="complement"
              />
              <Input
                id="complement"
                placeholder="Complemento"
                onChange={e => setComplement(e.target.value)}
                type="text"
                className="bg-input p-2 rounded-lg w-full"
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button>Cadastrar Empresa</Button>
        </ModalFooter>
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

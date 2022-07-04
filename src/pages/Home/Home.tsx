import { useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'

import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { X } from 'phosphor-react'
import { Label } from '../../components/Label/Label'

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleOpenModal() {
    setModalIsOpen(true)
  }

  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button onClick={handleOpenModal}>Cadastrar Auditoria</Button>
        </div>

        <Modal isOpen={modalIsOpen}>
          <div className="m-3">
            <button
              onClick={() => setModalIsOpen(false)}
              className="float-right"
            >
              <X size={24} color="#030303" />
            </button>

            <h1 className="text-2xl mb-2">Criação de Auditorias</h1>
            <span>
              Preencha as informações abaixo para cadastrar uma nova auditoria
            </span>
          </div>
          <hr />

          <ModalBody>
            <div className="grid grid-rows-1 mb-2">
              <Label htmlFor="title" text="Título" className="text-xs mb-1" />
              <Input
                id="title"
                placeholder="Título"
                className="bg-input p-2 rounded-lg w-full"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 mb-2">
              <div>
                <Label
                  htmlFor="responsible"
                  text="Responsável"
                  className="text-xs mb-1"
                />
                <Input
                  id="responsible"
                  placeholder="Responsável"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>

              <div>
                <Label
                  htmlFor="responsibleArea"
                  text="Área Responsável"
                  className="text-xs mb-1"
                />
                <Input
                  id="responsibleArea"
                  placeholder="Área Responsável"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
              <div>
                <Label
                  htmlFor="analyst"
                  text="Analista"
                  className="text-xs mb-1"
                />
                <Input
                  id="analyst"
                  placeholder="Analista"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>

              <div>
                <Label
                  htmlFor="status"
                  text="Status"
                  className="text-xs mb-1"
                />
                <Input
                  id="status"
                  placeholder="Status"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
              <div>
                <Label
                  htmlFor="sla"
                  text="Definir SLA"
                  className="text-xs mb-1"
                />
                <Input
                  id="sla"
                  placeholder="Definir SLA"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>

              <div>
                <Label
                  htmlFor="company"
                  text="Empresa"
                  className="text-xs mb-1"
                />
                <Input
                  id="company"
                  placeholder="Empresa"
                  className="bg-input p-2 rounded-lg w-52"
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
              <div>
                <Label
                  htmlFor="openDate"
                  text="Data de Abertura"
                  className="text-xs mb-1"
                />
                <Input
                  id="openDate"
                  className="bg-input p-2 rounded-lg w-52"
                  type="date"
                />
              </div>

              <div>
                <Label
                  htmlFor="limitDate"
                  text="Data Limite para Resolução"
                  className="text-xs mb-1"
                />
                <Input
                  id="limitDate"
                  className="bg-input p-2 rounded-lg w-52"
                  type="date"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 mb-2">
              <div>
                <Label
                  htmlFor="description"
                  text="Considerações/Descrição"
                  className="text-xs mb-1"
                />
                <textarea
                  id="description"
                  className="bg-input p-2 rounded-lg w-full"
                  placeholder='Considerações/Descrição'
                />
              </div>
            </div>

          </ModalBody>

          <ModalFooter>
          <Button onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button >Cadastrar Auditoria</Button>
          </ModalFooter>
        </Modal>

        <h1 className="text-3xl	text-white">Página Inicial</h1>
      </div>

      <div className="mt-16 bg-white rounded-lg p-2"></div>
    </div>
  )
}

export { Home }

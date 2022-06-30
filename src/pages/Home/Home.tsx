import { useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact'

import { Button } from '../../components/Button/Button'


function Home() {
  return (
    <div className="flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button>Cadastrar Auditoria</Button>
        </div>

        <h1 className="text-3xl	text-white">Página Inicial</h1>
      </div>

      <div className="mt-16 bg-white rounded-lg p-2">
      </div>
    </div>
  )
}

export { Home }

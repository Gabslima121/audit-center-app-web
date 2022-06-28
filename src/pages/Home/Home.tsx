import { Button } from '../../components/Button/Button'

function Home() {
  return (
    <div className="border-2 border-black flex-auto mt-5">
      <div>
        <div className="float-right">
          <Button>Cadastrar Auditoria</Button>
        </div>

        <h1 className="text-3xl	text-white">Página Inicial</h1>
      </div>

      <div className="border-2 border-black mt-16 bg-white rounded-lg">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { Home }

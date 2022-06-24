import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App

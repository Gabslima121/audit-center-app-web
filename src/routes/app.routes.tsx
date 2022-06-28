import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { SideBar } from '../components/SideBar/SideBar'
import { SideBarProvider } from '../contexts/SideBar/SideBarProvider'
import { Home } from '../pages/Home/Home'
import { RequireAuth } from '../contexts/Auth/RequireAuth'
import { Header } from '../components/Header/Header'
import { Graphs } from '../pages/Graphs/Graphs'
import { Content } from '../components/Content/Content'

const AppRoutes: React.FC = () => {
  return (
    <>
      <div className="flex w-full h-screen mr-40 bg-brand-300 bg-opacity-50">
        <SideBarProvider>
          <SideBar />
        </SideBarProvider>
        <Content>
          <Header />
          <Routes>
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/graphs"
              element={
                <RequireAuth>
                  <Graphs />
                </RequireAuth>
              }
            />
          </Routes>
        </Content>
      </div>
    </>
  )
}

export default AppRoutes

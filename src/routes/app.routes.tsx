import { Route, Routes } from 'react-router-dom'

import { SideBar } from '../components/SideBar/SideBar'
import { SideBarProvider } from '../contexts/SideBar/SideBarProvider'
import { Home } from '../pages/Home/Home'
import { Company } from '../pages/Company/Company'
import { RequireAuth } from '../contexts/Auth/RequireAuth'
import { Header } from '../components/Header/Header'
import { Graphs } from '../pages/Graphs/Graphs'
import { Content } from '../components/Content/Content'
import { User } from '../pages/User/User'
import { MyProfile } from '../pages/MyProfile/MyProfile'

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
              path="/companys"
              element={
                <RequireAuth>
                  <Company />
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
            <Route
              path="/users"
              element={
                <RequireAuth>
                  <User />
                </RequireAuth>
              }
            />
            <Route path={`/my-profile/:id`} element={
              <RequireAuth>
                <MyProfile />
              </RequireAuth>
            } />
          </Routes>
        </Content>
      </div>
    </>
  )
}

export default AppRoutes

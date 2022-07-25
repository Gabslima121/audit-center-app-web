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
import { CompanyDetailed } from '../pages/Company/CompanyDetailed/CompanyDetailed'
import { CompanyProvider } from '../contexts/Company/CompanyProvider'
import { CompanyTickets } from '../pages/Company/CompanyDetailed/CompanyTickets/CompanyTickets'
import { CompanySLA } from '../pages/Company/CompanyDetailed/CompanySLA/CompanySLA'

const AppRoutes: React.FC = () => {
  return (
    <>
      <CompanyProvider>
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
              <Route
                path={`/my-profile/:id`}
                element={
                  <RequireAuth>
                    <MyProfile />
                  </RequireAuth>
                }
              />
              <Route
                path={`/company/detailed/:id`}
                element={
                  <RequireAuth>
                    <CompanyDetailed />
                  </RequireAuth>
                }
              />
               <Route
                path={`/company/detailed/tickets/:id`}
                element={
                  <RequireAuth>
                    <CompanyTickets />
                  </RequireAuth>
                }
              />
              <Route
                path={`/company/detailed/define-sla/:id`}
                element={
                  <RequireAuth>
                    <CompanySLA />
                  </RequireAuth>
                }
              />
            </Routes>
          </Content>
        </div>
      </CompanyProvider>
    </>
  )
}

export default AppRoutes

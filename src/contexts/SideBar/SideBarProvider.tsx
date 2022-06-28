import { useState } from 'react'
import { SideBarContext } from './SideBarContext'

export const SideBarProvider = ({ children }: { children: JSX.Element }) => {
  const [opened, setOpened] = useState(true)
  const [page, setPage] = useState('Home')
  function getPage(pageDestination: string) {
    setPage(pageDestination)
  }
  function opening() {
    setOpened(!opened)
  }
  return (
    <SideBarContext.Provider value={{ opened, opening, page, getPage }}>
      {children}
    </SideBarContext.Provider>
  )
}

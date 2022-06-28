import { createContext } from "react"

export type SideBarContextType = {
  opened: boolean;
  opening(): void;
  page: string;
  getPage(pageDestination: string): void;
}

export const SideBarContext = createContext<SideBarContextType>(null!)
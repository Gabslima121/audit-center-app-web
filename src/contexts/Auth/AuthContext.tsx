import { createContext } from "react";

import { RolesType } from "../../types/RolesType";
import { SiginType } from "../../types/SiginType";
import { UserType } from "../../types/UserType";

export type AuthContextProps = {
  user: UserType | null;
  roles: RolesType[];
  sigin: (email: string, password: string) => Promise<SiginType>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isAuditor: boolean;
  isAnalyst: boolean;
  // logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(null!);
import { createContext } from "react";

import { SiginType } from "../../types/SiginType";
import { UserType } from "../../types/UserType";

export type AuthContextProps = {
  user: UserType | null;
  roles: string[];
  sigin: (email: string, password: string) => Promise<SiginType>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  // logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(null!);
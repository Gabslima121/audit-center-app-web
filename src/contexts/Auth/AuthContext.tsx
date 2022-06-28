import { createContext } from "react";

import { SiginType } from "../../types/Sigin";
import { UserType } from "../../types/User";

export type AuthContextProps = {
  user: UserType | null;
  roles: string[];
  sigin: (email: string, password: string) => Promise<SiginType>;
  // logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(null!);
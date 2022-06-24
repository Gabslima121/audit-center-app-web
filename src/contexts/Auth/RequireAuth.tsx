import { useContext } from "react";
import { Login } from "../../pages/Login/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Login />;
  }

  return children;
}
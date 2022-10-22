import React from "react";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
interface RequireAuthProps {}
//Protected Route
const RequireAuth = ({ children }: any) => {
  const { isLoggedIn } = useAuth();
  const loggedIn = isLoggedIn();
  return loggedIn ? <>{children}</> : <Navigate to="/" replace />;
};
export default RequireAuth;

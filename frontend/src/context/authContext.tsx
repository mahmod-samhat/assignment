import React from "react";
import { useState, useContext, createContext } from "react";
import Admin from "../interfaces/admin";
import authServices from "../services/authServices";
import adminServices from "../services/adminServices";
interface authContext {
  isLoggedIn: () => boolean;
  login: ({}: any) => Promise<any>;
  logout: () => void;
  updateAdminContext: () => any;
  refreshAdmin: ({}: Admin) => void;
  admin: Admin;
}
export const authContext = createContext<authContext>({} as authContext);
authContext.displayName = "auth-context";

export const AuthProvider = (props: any) => {
  const [admin, setAdmin] = useState<Admin>({} as Admin);

  const isLoggedIn = () => {
    const username = localStorage.getItem("id");
    return !!username;
  };

  const refreshAdmin = (admin: Admin) => {
    setAdmin(admin);
  };
  

  // token => id
  const login = async (credentials: any) => {
    const admin = await authServices.logIn(credentials);
    await refreshAdmin(admin);
    return admin;
  };
  const updateAdminContext = async () => {
    if (Object.keys(admin).length > 0) return;
    const newAdmin = await adminServices.getAdmin(localStorage.getItem("id"));
    refreshAdmin(newAdmin);
    return newAdmin;
  };
  const logout = () => {
    authServices.logout();
    refreshAdmin({} as Admin);
  };

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        admin,
        isLoggedIn,
        updateAdminContext,
        refreshAdmin,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

import React from "react";
import { useContext, createContext } from "react";
import { useAuth } from "../context/authContext";
interface permissions {
  canWrite: () => boolean;
  canDelete: () => boolean;
}
interface permissionsContext {
  permissions: permissions;
}
export const permissionsContext = createContext<permissionsContext>(
  {} as permissionsContext
);
permissionsContext.displayName = "permissions-context";

export const PermissionsProvider = (props: any) => {
  const { admin } = useAuth();

  const canWrite = () => {
    return admin.role === Roles.Manager || admin.role === Roles.Superadmin;
  };
  const canDelete = () => {
    return admin.role === Roles.Superadmin;
  };

  const permissions = { canWrite, canDelete } as permissions;
  return (
    <permissionsContext.Provider value={{ permissions }}>
      {props.children}
    </permissionsContext.Provider>
  );
};

export const usePermissions = () => {
  return useContext(permissionsContext);
};

enum Roles {
  Manager = "manager",
  Superadmin = "superadmin",
  Employee = "employee",
}

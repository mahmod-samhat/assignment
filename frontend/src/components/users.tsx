import * as React from "react";
import { useTheme } from "@mui/material";
import { Grid, Box } from "@mui/material";
import UsersTable from "./usersTable";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const theme = useTheme();

  return (
    <Box height="100%" overflow-y="auto" overflow-x="auto">
      <h2>Users Management</h2>
      <UsersTable />
    </Box>
  );
};
export default Users;

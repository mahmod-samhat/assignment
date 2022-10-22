import * as React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/myTheme";
import Home from "./components/home";
import LogIn from "./components/logIn";
import Users from "./components/users";
import Header from "./components/header";
import { useAuth } from "./context/authContext";
import AdminProfile from "./components/adminProfile";
import UserEdit from "./components/userEdit";
import RequireAuth from "./components/common/requireAuth";
import PageNotFound from "./components/common/pageNotFound";
import { ToastContainer } from "react-toastify";
import { height } from "@mui/system";

function App() {
  const { updateAdminContext, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    isLoggedIn()
      ? updateAdminContext().then(() => setIsLoading(false))
      : setIsLoading(false);
  }, []);
  return (
    <div className="App">
      <Box component="div" height="100%">
        {!isLoading && (
          <ThemeProvider theme={theme}>
            <Box height="100vh">
              <Box>
                <Header />
              </Box>
              <Box height="100%">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/logIn" element={<LogIn />} />
                  <Route
                    path="/users"
                    element={
                      <RequireAuth>
                        <Users />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/adminProfile"
                    element={
                      <RequireAuth>
                        <AdminProfile />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/userEdit/:id"
                    element={
                      <RequireAuth>
                        <UserEdit />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="*"
                    element={
                      <RequireAuth>
                        <PageNotFound />
                      </RequireAuth>
                    }
                  />
                </Routes>
              </Box>
            </Box>
            <ToastContainer />
          </ThemeProvider>
        )}
      </Box>
    </div>
  );
}

export default App;

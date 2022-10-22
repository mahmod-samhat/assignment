import React from "react";

import {
  Toolbar,
  Box,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import DrawerComp from "./DrawerComp";
import Navbar from "./nav";
import Title from "./title";
import AccountMenu from "./accountMenu";

interface props {}

const Header: React.FC<props> = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Toolbar
      sx={{
        backgroundColor: theme.secondary.light,
        borderBottom: "6px solid white",
      }}
    >
      {isMatch ? (
        <>
          <Grid item xs={3}>
            <Title />
          </Grid>
          <DrawerComp />
        </>
      ) : (
        <Grid
          container
          sx={{
            placeItems: "center",
          }}
        >
          <Grid item xs={1}>
            <Box
              component="img"
              alt="Haat logo"
              src="https://www.haat.delivery/assets/logo.svg"
              p={1}
            />
          </Grid>
          <Grid item xs={3}>
            <Title />
          </Grid>
          {isLoggedIn() ? (
            <>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Navbar />
              </Grid>
              <Grid item xs={4}>
                <Box display="flex">
                  <Box marginLeft="auto" display="flex">
                    <AccountMenu />
                  </Box>
                </Box>
              </Grid>
            </>
          ) : (
            <Button
              sx={{
                ":hover": {
                  bgcolor: theme.primary.light,
                },
                marginLeft: "auto",
                background: theme.primary.main,
                color: "black",
              }}
              variant="contained"
              onClick={() => navigate("/logIn")}
            >
              Log In
              <LoginIcon />
            </Button>
          )}
        </Grid>
      )}
    </Toolbar>
  );
};
export default Header;

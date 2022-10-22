import * as React from "react";
import { Image } from "mui-image";
import profile_data from "../assets/profile-data.jpg";
import {
  Alert,
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IsLoading from "./common/isLoading";

export default function SignInSide() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const theme = useTheme();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const user = await login(values);
    if (!user) setError("Username Or Password is incorrect.");
    else navigate("/");
    setIsLoading(false);
  };

  return (
    <Box height="100%">
      {isLoading && <IsLoading />}
      <Grid container component="main" height="100%">
        <Grid item xs={false} sm={3} md={6} height="100%">
          <Image src={profile_data} fit="contain" />
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              m: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                height: 56,
                width: 56,
                m: 1,
                bgcolor: theme.primary.main,
                color: "red",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
              <Alert sx={{ width: "100%" }} variant="filled" severity="error">
                {error}
              </Alert>
            )}
            <Box
              component="form"
              // noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                color="warning"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="warning"
              />
              <Box component="div" display="flex" alignItems="center">
                <FormControlLabel
                  control={<Checkbox value="remember" color="warning" />}
                  label="Remember me"
                />
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  ":hover": {
                    bgcolor: theme.primary.light,
                  },
                  mt: 3,
                  mb: 2,
                  bgcolor: theme.primary.main,
                  color: "black",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

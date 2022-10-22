import * as React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Image } from "mui-image";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { updateAdmin } from "../services/adminServices";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  TextField,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { admin, refreshAdmin } = useAuth();
  const [error, setError] = React.useState("");

  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,

    initialValues: {
      name: admin.name,
      username: admin.username,
      password: admin.password,
    },
    validationSchema: validationSchema,

    async onSubmit(values) {
      updateAdmin({ ...admin, ...values }).then(() => {
        refreshAdmin({ ...admin, ...values });
        toast.success("Admin successfully updated", {
          position: "bottom-right",
        });
        navigate("/");
      });
    },
  });

  return (
    <Box
      display={"flex"}
      height={"100%"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      sx={{
        background: `linear-gradient(36deg, ${theme.primary.main} 50%, ${theme.secondary.main} 40%, ${theme.primary.main} 91%)`,
      }}
    >
      <Box marginTop={"50px"}>
        <Paper
          sx={{
            p: 1,
            background: "whitesmoke",
            border: "10px solid white",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => navigate(-1)}
            sx={{ marginLeft: "auto", display: "block" }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            display="flex"
            flexDirection="column"
          >
            <Typography component="h1" variant="h5">
              Admin Profile
            </Typography>

            {error && (
              <Alert sx={{ width: "100%" }} variant="filled" severity="error">
                {error}
              </Alert>
            )}
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              margin="dense"
              name="name"
              label="Name"
              id="name"
              autoComplete="current-name"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              margin="dense"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              variant="filled"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              margin="dense"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              InputLabelProps={{ shrink: true }}
              size="small"
              margin="dense"
              name="role"
              label="Role"
              id="role"
              autoComplete="current-role"
              color="warning"
              variant="filled"
              value={admin.role}
            />
            <Fab type="submit" color="success" sx={{ m: 3 }} variant="extended">
              <ManageAccountsIcon />
              Save
            </Fab>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

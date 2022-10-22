import * as React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import Fab from "@mui/material/Fab";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import User from "../interfaces/user";
import { usePermissions } from "../context/permissionsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  TextField,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import userService from "../services/userServices";
import IsLoading from "./common/isLoading";

const validationSchema = yup.object({
  first_name: yup.string().required("first_name is required"),
  last_name: yup.string().required("last_name is required"),
  email: yup
    .string()
    .email("incorrect email adress")
    .required("email is required"),
  gender: yup.string().required("gender is required"),
  age: yup.number().required("age is required"),
  country: yup.string().required("country is required"),
  occupation: yup.string().required("occupation is required"),
  username: yup
    .string()
    .min(6, "username should be of minimum 6 characters length")
    .required("username is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  phone_number: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

export default function UserEdit() {
  const { permissions } = usePermissions();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const theme = useTheme();
  const [user, setUser] = React.useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    age: "",
    country: "",
    occupation: "",
    username: "",
    password: "",
    phone_number: "",
  } as User);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      userService.getUserById(id).then((res) => {
        setUser(res.data);
        setIsLoading(false);
      });
    };
    fetchData();
  }, []);

  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,

    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      country: user.country,
      occupation: user.occupation,
      username: user.username,
      password: user.password,
      phone_number: user.phone_number,
    },

    validationSchema: validationSchema,

    async onSubmit(values) {
      userService.updateUser({ ...user, ...values }).then(() => {
        toast.success("user successfuly updated");
        console.log({ ...user, ...values });
        navigate(-1);
      });
    },
  });

  return (
    <>
      <Box
        height="100%"
        sx={{
          background: `linear-gradient(36deg, ${theme.primary.main} 50%, ${theme.secondary.main} 40%, ${theme.primary.main} 91%)`,
        }}
      >
        <Grid  alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <Paper
              elevation={6}
              sx={{
                border: "10px solid white",
                bgcolor: "lightgrey",
                borderRadius: "50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mx: "30px",
                  pt: "15px",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ID : {id}
                </Typography>
                <Typography
                  align="left"
                  px={10}
                  pt={3}
                  fontSize="30px"
                  fontFamily="'Anton', sans-serif"
                >
                  Edit User
                  <AutoFixHighIcon />
                </Typography>
                <Box display="flex" gap={1}>
                  <Fab
                    size="small"
                    color="success"
                    variant="extended"
                    type="submit"
                    onClick={() => {
                      formik.submitForm();
                    }}
                  >
                    <SaveIcon sx={{ mr: 1 }} />
                    Save
                  </Fab>

                  {permissions.canDelete() && (
                    <Fab
                      size="small"
                      color="error"
                      variant="extended"
                      type="submit"
                      onClick={() => {
                        userService.deleteUser(user.id).then(() => {
                          toast.error("user successfully deleted");
                          navigate(-1);
                        });
                      }}
                    >
                      <DeleteIcon sx={{ mr: 1 }} />
                      Delete
                    </Fab>
                  )}
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Box>
                  <Box
                    component="img"
                    src={user.profile_picture}
                    sx={{
                      borderRadius: "50px",
                      border: "5px solid white",
                     minWidth:"300px",
                      m: 1,
                    }}
                  />
                  <Box display={"flex"} justifyContent={"end"}>
                    <Typography fontSize="20px">
                      {user.first_name} {user.last_name} <PersonIcon />
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"end"}>
                    <Typography fontSize="15px">
                      {user.email}
                      <AlternateEmailIcon />
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"end"}>
                    <Typography fontSize="15px">
                      {user.phone_number} <PhoneIcon />
                    </Typography>
                  </Box>
                </Box>

                <Grid item xs={9}>
                  <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Box display="flex">
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="first_name"
                        label="First Name"
                        id="first_name"
                        autoComplete="current-first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.first_name &&
                          Boolean(formik.errors.first_name)
                        }
                        helperText={
                          formik.touched.first_name && formik.errors.first_name
                        }
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.last_name &&
                          Boolean(formik.errors.last_name)
                        }
                        helperText={
                          formik.touched.last_name && formik.errors.last_name
                        }
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="phone_number"
                        label="Phone_number"
                        type="phone_number"
                        id="phone_number"
                        autoComplete="current-phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.phone_number &&
                          Boolean(formik.errors.phone_number)
                        }
                        helperText={
                          formik.touched.phone_number &&
                          formik.errors.phone_number
                        }
                      />
                    </Box>
                    <Box display="flex">
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="email"
                        label="Email"
                        id="email"
                        autoComplete="current-email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Box>
                    <Box display="flex">
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="country"
                        label="Country"
                        type="country"
                        id="country"
                        autoComplete="current-country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.country &&
                          Boolean(formik.errors.country)
                        }
                        helperText={
                          formik.touched.country && formik.errors.country
                        }
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="gender"
                        label="Gender"
                        id="gender"
                        autoComplete="current-password"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.gender && Boolean(formik.errors.gender)
                        }
                        helperText={
                          formik.touched.gender && formik.errors.gender
                        }
                      />
                      <TextField
                        color="success"
                        variant="filled"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        autoComplete="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                      />
                      <TextField
                        color="success"
                        variant="standard"
                        sx={{ m: 3 }}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        fullWidth
                        name="occupation"
                        label="Occupation"
                        id="occupation"
                        autoComplete="current-occupation"
                        value={formik.values.occupation}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.occupation &&
                          Boolean(formik.errors.occupation)
                        }
                        helperText={
                          formik.touched.occupation && formik.errors.occupation
                        }
                      />
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <IsLoading />}
    </>
  );
}

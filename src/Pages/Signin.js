import * as React from 'react';
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NoteContext from '../context/noteContext';
import Axios from 'axios'
import { Outlet } from "react-router-dom"
import { FormControl, Modal } from '@mui/material';
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/system';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { SigninSchema } from '../Validations/Signin.validation';
function setSessionToken(userToken, id, names, avatar) {
  sessionStorage.setItem('token', userToken);
  sessionStorage.setItem('id', id);
  sessionStorage.setItem('creatername', names);
  sessionStorage.setItem('avatar', avatar);
  console.log("storage")
}

export default function SignIn() {
  const theme = useTheme()
  const a = useContext(NoteContext)
  const Navigate = useNavigate();
  const initialValues = {
    email: "",
    password: ""
  }

  const [openSnack, setOpenSnack] = useState(false)

  const [loading, setLoading] = useState(false)
  const handleSubmit = (values, props) => {
    setLoading(true)
    console.log(values)
    console.log(props)


    // const data = new FormData(event.currentTarget);

    Axios.post("https://nice-plum-panda-tam.cyclic.app/login", {
      email: values.email,
      password: values.password

    }).then((response) => {

      console.log("id ", response.data.userId)
      a.setToken(response.token)
      a.setId(response.data.userId)
      console.log(response.token)
      a.setcreatername(response.data.name)
      const ava = response.data.avatar;
      const base64 = btoa(
        new Uint8Array(ava.data.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, '')
      );
      const img = `data:image/png;base64,${base64}`;

      a.setAvatar(img)
      setSessionToken(response.data.token, response.data.userId, response.data.name, img)

      setLoading(false)
      a.setLoginText("logout")
      Navigate("/posts")

    }).catch((error) => { console.log(error); setLoading(false); setOpenSnack(true) });
  };


  const handleSubmit2 = () => {
    setLoading(true)
    //event.preventDefault();
    //const data = new FormData(event.currentTarget);

    Axios.post("https://nice-plum-panda-tam.cyclic.app/login", {
      email: "hammad",
      password: "hammad"

    }).then((response) => {

      a.setToken(response.token)
      a.setId(response.data.userId)

      a.setcreatername(response.data.name)
      const ava = response.data.avatar;
      const base64 = btoa(
        new Uint8Array(ava.data.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
        }, '')
      );
      const img = `data:image/png;base64,${base64}`;

      a.setAvatar(img)
      setSessionToken(response.data.token, response.data.userId, response.data.name, img)
      setLoading(false)
      a.setLoginText("logout")
      Navigate("/posts")

    }).catch((error) => { console.log(error); setLoading(false); setOpenSnack(true) });
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Snackbar open={openSnack} autoHideDuration={4000} onClose={() => setOpenSnack(false)}>
          <Alert onClose={() => { setOpenSnack(false) }} severity="error" variant="filled" sx={{ width: '100%' }}>
            Login failed
          </Alert>
        </Snackbar>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}  >
          {({ errors, touched }) =>
            <Form >

              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />

              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}

              />
              <Link sx={{ textDecoration: 'none !important', textDecorationLine: "none" }} to='/signup'>Signup</Link>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      // color: green[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-10px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
                <Button
                  disabled={loading}
                  fullWidth
                  color="error"
                  variant="contained"
                  onClick={() => handleSubmit2()}
                  sx={{ mt: 1, mb: 2 }}>Login as Hammad</Button>
              </Box>
            </Form>

          }
        </Formik>

      </Box>


    </Container >

  );
}
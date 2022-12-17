
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from "react"
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { useTheme } from "@mui/material"


export default function SignUp() {
  const theme = useTheme()
  const [errorMail, setErrorMail] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (data.get('email').includes("@gmail.com")) {
      await Axios.post("https://nice-plum-panda-tam.cyclic.app/signup", {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),

      }).then((response) => {
        console.log(response)
        setOpen(true)
        setLoading(false)
        // console.log(response.data.token)
        // a.setToken(response.data.token)

      });
    }
    else {
      alert("invalid input")
      setErrorMail("true")
      setLoading(false)
    }
    ;
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Signed Up Successfully: Login Now
            </Alert>
          </Snackbar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                />
              </Grid>



              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={errorMail}
                  helperText={errorMail ? "Must include @gmail.com" : " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      // color: green[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>

            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}
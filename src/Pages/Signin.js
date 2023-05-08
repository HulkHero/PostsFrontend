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
import { Modal } from '@mui/material';
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/system';

function setSessionToken(userToken, id, names) {
  sessionStorage.setItem('token', userToken);
  sessionStorage.setItem('id', id);
  sessionStorage.setItem('creatername', names);
  console.log("storage")
}

export default function SignIn() {
  const theme = useTheme()
  const a = useContext(NoteContext)
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [show, setSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("https://nice-plum-panda-tam.cyclic.app/login", {
      email: data.get('email'),
      password: data.get('password')

    }).then((response) => {
      console.log(response)
      console.log(response.data.token)
      console.log("id ", response.data.userId)
      a.setToken(response.token)
      a.setId(response.data.userId)
      console.log(response.token)
      a.setcreatername(response.data.name)

      setSessionToken(response.data.token, response.data.userId, response.data.name)
      setLoading(false)
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
      console.log(response)
      console.log(response.data.token)
      console.log("id ", response.data.userId)
      a.setToken(response.token)
      a.setId(response.data.userId)
      console.log(response.token)
      a.setcreatername(response.data.name)

      setSessionToken(response.data.token, response.data.userId, response.data.name)
      setLoading(false)
      Navigate("/posts")

    }).catch((error) => { console.log(error); setLoading(false); setOpenSnack(true) });
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box position="absolute" top="40%" left="40%" backgroundColor="blue" padding="10px">
          <Typography id="modal-modal-title" variant="h6" color="white" component="h2">
            Logged in
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

      <Button onClick={() => setSignup(!show)}><Link sx={{ textDecoration: 'none' }} to='/signup'>Signup</Link></Button>
      {show == true ? <Outlet></Outlet> : " "}
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
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
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </Box>
      </Box>


    </Container>

  );
}
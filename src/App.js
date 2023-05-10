
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import NavBar from './components/NavBar';
import { ThemeProvider } from "@mui/material"
import Home from './Pages/Home';
import theme from './Theme';
import AddPosts from "./Pages/AddPosts";
import SignIn from "./Pages/Signin";
import NoteContext from './context/noteContext';
import Signup from './Pages/Signup';

import FriendsHome from './Pages/FriendsHome';
import Profile from './Pages/Profile';
function App() {
  const a = useContext(NoteContext)
  const [islogged, setIslogged] = useState(false);
  const getStorageData = async () => {
    const token = await sessionStorage.getItem("token");
    a.setToken(token)
    const id = await sessionStorage.getItem("id");
    a.setId(id)
    const name = await sessionStorage.getItem("creatername");
    a.setcreatername(name)
    console.log("getting Data from storage")
  }
  useEffect(() => {
    getStorageData()
    if (a.token) {
      setIslogged(true);
    }
    else {
      setIslogged(false)
    }



  }, [a])



  return (
    <>
      <ThemeProvider theme={theme}>

        <Router>
          <CssBaseline />

          {islogged == true ?

            <NavBar></NavBar> : null}

          <Routes>



            <Route path='/posts' element={<Home />} ></Route>
            <Route path='addposts' element={<AddPosts />}></Route>
            <Route path='myPosts' element={<Profile />}></Route>
            <Route path="addFriends" element={<FriendsHome />} />
          </Routes>


          <Routes>
            <Route exact path='/' element={<SignIn />}>
              <Route exact path='signup' element={<Signup />} />
            </Route>
          </Routes>

        </Router>

      </ThemeProvider>

    </>
  );
}


export default App;

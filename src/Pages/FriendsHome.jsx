import { Grid,Container } from '@mui/material'
import React from 'react'
import AddFriends from './AddFriends'
import RecievedFriends from './RecievedFriends'

const FriendsHome = () => {
  return (
    <>
    <Container>
    <Grid container >
        <Grid item xs={12} md={6} sx={{justifyContent:"center"}} ><AddFriends></AddFriends></Grid>
        <Grid item xs={12} md={6} sx={{justifyContent:"center"}}><RecievedFriends></RecievedFriends></Grid>
    </Grid>
    </Container>
    </>
  )
}

export default FriendsHome
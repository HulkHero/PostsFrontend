import { Grid,Box, } from '@mui/material'
import React,{useEffect} from 'react'
import CardContainer from '../components/CardContainer'
import AlignItemsList from '../components/friends'
import NavBar from '../components/NavBar'

const Home = () => {
  
 
  return (
    <>
    
    <Box  sx={{backgroundColor:"#f0f2f5",minHeight:"100vh"}}>
        <Grid container xs={12} sx={{display: 'flex',justifyContent: 'space-around',color:"black",backgroundColor:"#f0f2f5"}} >
          <Grid item xs={0} sm={3} sx={{ display:{xs:"none",sm:"block"}}}><div  style={{width:"25%",position:"fixed",backgroundColor:"#f0f2f5"}} >
            <AlignItemsList/></div></Grid>
          <Grid item xs={12} sm={6} sx={{display: 'flex',justifyContent: 'center'}}><CardContainer></CardContainer></Grid>
          <Grid item xs={0} sm={3} evaluation={3} sx={{ display:{xs:"none",sm:"block"}}}><div style={{position:"fixed"}} >
            <a>right bar</a></div></Grid>
           



        </Grid>

    </Box>
    </>
  )
}

export default Home
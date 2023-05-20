import React,{useContext} from 'react'
import {AppBar,Tabs,Tab,Box,Drawer,Grid,Typography, Tooltip,Avatar,Menu,MenuItem,ListItemIcon, ListItemButton,SwipeableDrawer} from '@mui/material'
import {Link} from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
 import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../Theme';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import InputBase from '@mui/material/InputBase';
import "./nav.css"
import SearchIcon from '@mui/icons-material/Search';
import NoteContext from '../context/noteContext'
import Logout from "@mui/icons-material/Logout"
const Head=styled("Box")(({theme})=>({
 // position:"relative",
  //height:"auto",
  opacity:1,
  display:"flex",
  justifyContent:"center",
  flexFlow:"row-reverse",
  //top:"0px",
  transition:"height 0.5s"
  

}))
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius:"50px",
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover,&:focus': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    //  transform:"scaleX(1.1)"
    "@keyframes fade":{
      "0%":{
        marginRight:"20px",
        paddingRight:"0px"

      },
      "100%":{
        marginRight:"0px",
        paddingRight:"20px"
      }
     
    },
    animation:"fade 0.6s linear normal forwards",
    animationIterationCount:"1",
  },
  marginRight: "20px",
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      // '&:focus': {
      //   width: '20ch',
      // },
    },
    [theme.breakpoints.down('md')]: {
      width: '8ch',
      // '&:focus': {
      //   width: '20ch',
      // },
    },
  },
  "&:visited":{
    transform:"scaleX(1.1)",
  }
}));
const NavBar = () => {
  const a= useContext(NoteContext)
  if (a.token)
  {}
  else{
    const getToken=sessionStorage.getItem("token");
   
      const getid=sessionStorage.getItem("id");
      const getcreatername=sessionStorage.getItem("creatername");
      const avatar=sessionStorage.getItem("avatar");
    if(getToken!==null){
      a.setToken(getToken)
      a.setId(getid)
      a.setcreatername(getcreatername)
      a.setavatar(avatar);
    }
  }


  window.onscroll = function() {scrollFunction()};
  console.log("a.avatar",a.avatar)
  

  
function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    
    document.getElementById("ns").style.height = "0px";
     document.getElementById("ns").style.opacity = "0";
  } else {
    document.getElementById("ns").style.height = "auto";
     document.getElementById("ns").style.opacity = "1";
  }
}
  const [drawer, setDrawer] = React.useState(false)
    const [line, setLine] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    
     <Box sx={{marginBottom:{xs:"6rem",sm:"3rem"}}}>
      {a &&
         <div> <AppBar  position="fixed" sx={{display:{xs:'none',sm:"block"},marginBottom:"2rem",mb:"50px"}}>
     
      <Box sx={{display:{xs:'none',sm:"block"}}}>
      <Toolbar sx={{display: 'flex',minHeight:"50px", "&.MuiToolbar-root":{minHeight:"50px"}}}>
        
          {/* <MenuIcon /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Posts"
            sx={{
              mr: 2,
              // pr:"4rem",
             alignSelf: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.4rem',
            }}
          >
            {"<Hulk>"}
          </Typography>
        
        <Search sx={{display:{xs:"none",md:"block"}}} >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
       
        <Tabs textColor="secondary" fontSize="small"   sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"0px",
    // "& button": { borderRadius: 4 },
    // "& button:hover": { backgroundColor: "blue" },
    // "& button:focus": { backgroundColor: "yellow" },
    // "& button:active": { backgroundColor: "green" }
  }} indicatorColor="secondary" value={line} onChange={(e,value)=>{ setLine(value)}}>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===0? <Tooltip title="Home"><HomeIcon/></Tooltip> :< Tooltip title="Home"><HomeOutlinedIcon/></Tooltip>} to="/posts" component={Link}  >
        
          
       
        </Tab>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===1? <Tooltip title="New Post"><PostAddIcon></PostAddIcon></Tooltip>: <Tooltip title="New Post"><PostAddOutlinedIcon></PostAddOutlinedIcon></Tooltip>} to="/addposts" component={Link} >
        
        </Tab>
        <Tab  sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===2? <Tooltip title="Profile"><PersonIcon/></Tooltip>:<Tooltip title="Profile"><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></Tooltip>} to="/myPosts" component={Link}  >
        </Tab>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        //  "& :hover":{
        //    backgroundColor:"#FFFFFF",
        //  },
        
        color:"#FFFFFF"}}  icon={line===3? <Tooltip title="Add Friends"><PersonAddAlt1Icon/></Tooltip>:<Tooltip title="Add Friends"><PersonAddAltOutlinedIcon></PersonAddAltOutlinedIcon></Tooltip>}  component={Link} to="/addFriends" ><Button sx={{color:"#FFFFFF"}}>
   
          Add Friends
        </Button>
        </Tab>
        </Tabs>
       
    <Button sx={{display:{xs:"none",md:"inline-block"},ml:'auto',textColor:"#FFFFFF",color:"#FFFFFF",textAlign:"center"}} minWidth href="https://drive.google.com/file/d/1rVfqyZF8uD5zAJhOcd0YqwRak_PISEfj/view?usp=sharing" target={" "} >APK</Button>
    <Button sx={{display:{xs:"none",md:"inline-block"},textColor:"#FFFFFF",color:"#FFFFFF",textAlign:"center"}}  minWidth href="https://drive.google.com/file/d/1698nyqMNmiHEuP1_5crfDfzbjpl_DJZB/view?usp=sharing" target={" "} >Other Projects</Button>
    <IconButton onClick={handleClick} size={"small"}>
      
     
       <Avatar  alt="H" src={a.avatar}> </Avatar></IconButton>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <div onClick={handleClose}>
          <ListItemButton sx={{minWidth:"30px"}} component={Link} onClick={()=>{a.logout()}} to="/">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout</ListItemButton>
        </div>
        {/* <MenuItem onClick={handleClose}><Link onClick={()=>{console.log("clicked logout"); a.logout()}} to="/" style={{textDecoration:"none"}} >Logout</Link></MenuItem> */}
      </Menu>

              </Toolbar>

    </Box>
    </AppBar>
    <AppBar position="fixed" sx={{display:{xs:'block',sm:"none"},marginBottom:"2rem",mb:"50px"}}>

    <Box sx={{display:{xs:"block",sm:"none",minHeight:"50px"}}}>
      <Head id="ns"  class="ns">
      <IconButton onClick={()=>{setDrawer(!drawer)}} sx={{ display:"inline-block",color:"#fff" }} ><MenuRoundedIcon></MenuRoundedIcon></IconButton>
      <IconButton onClick={handleClick} sx={{ width: 29, height: 29,mt:"0.3rem" }} size={"small"}>
      <Avatar  alt="H" size={"small"}  sx={{ width: 29, height: 29 }} src={a.avatar}> </Avatar></IconButton>
   <Menu
       id="basic-menu"
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       MenuListProps={{
         'aria-labelledby': 'basic-button',
       }}
     >
        <div onClick={handleClose}>
         <ListItemButton sx={{minWidth:"30px"}} component={Link} onClick={()=>{a.logout()}} to="/">
         <ListItemIcon>
           <Logout fontSize="small" />
         </ListItemIcon>
         Logout</ListItemButton>
       </div>
       {/* <MenuItem onClick={handleClose}><Link onClick={()=>{console.log("clicked logout"); a.logout()}} to="/" style={{textDecoration:"none"}} >Logout</Link></MenuItem> */}
     </Menu>
              <div style={{display:"block",marginLeft:"10px",marginRight:"auto"}}>
              <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Posts"
            sx={{
              
              // pr:"4rem",
             alignSelf: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {"<Hulk>"}
          </Typography>
          </div>
          </Head>
      <Toolbar sx={{display:"flex",justifyContent:"center",minHeight:"50px"}}>
              <Tabs textColor="secondary" fontSize="small"   sx={{
          marginLeft:"auto",
          marginRight:"auto",
          minWidth:"0px",
    // "& button": { borderRadius: 4 },
    // "& button:hover": { backgroundColor: "blue" },
    // "& button:focus": { backgroundColor: "yellow" },
    // "& button:active": { backgroundColor: "green" }
  }} indicatorColor="secondary" value={line} onChange={(e,value)=>{ setLine(value)}}>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===0? <Tooltip title="Home"><HomeIcon/></Tooltip> :< Tooltip title="Home"><HomeOutlinedIcon/></Tooltip>} to="/posts" component={Link}  >  
        </Tab>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===1? <Tooltip title="New Post"><PostAddIcon></PostAddIcon></Tooltip>: <Tooltip title="New Post"><PostAddOutlinedIcon></PostAddOutlinedIcon></Tooltip>} to="/addposts" component={Link} >
        
        </Tab>
        <Tab  sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        color:"#FFFFFF"}} icon={line===2? <Tooltip title="Profile"><PersonIcon/></Tooltip>:<Tooltip title="Profile"><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></Tooltip>} to="/myPosts" component={Link}  >
        </Tab>
        <Tab sx={{'& .MuiSvgIcon-root':{
          fontSize:"xx large",
        },
        //  "& :hover":{
        //    backgroundColor:"#FFFFFF",
        //  },
        
        color:"#FFFFFF"}}  icon={line===3? <Tooltip title="Add Friends"><PersonAddAlt1Icon/></Tooltip>:<Tooltip title="Add Friends"><PersonAddAltOutlinedIcon></PersonAddAltOutlinedIcon></Tooltip>}  component={Link} to="/addFriends" ><Button sx={{color:"#FFFFFF"}}>
   
          Add Friends
        </Button>
        </Tab>
        </Tabs>
                 
              </Toolbar>        
              <SwipeableDrawer 
            anchor="left"
            open={drawer}
            onClose={()=>{setDrawer(false)}}
            onOpen={()=>(setDrawer(true))}
          >
            <Grid container  sx={{Width:"50%",height:"100%", Display:"flex",flexDirection:"column", backgroundColor:"primary.main"}} >

               <Link  style={{textDecoration:'none'}}   to="/posts"> <Button onClick={()=>setDrawer(false)} sx={{ color:"#fff" }}>Posts</Button></Link>
               <Link style={{textDecoration:'none'}}  to="/myPosts"> <Button onClick={()=>setDrawer(false)} sx={{ color:"#fff" }}>{"My Posts  " }  </Button></Link>
               <Link style={{textDecoration:'none'}}  to="/addposts"> <Button onClick={()=>setDrawer(false)}  sx={{ color:"#fff" }}>Add Post</Button></Link>
               <Link style={{textDecoration:'none'}}  to="/addFriends"> <Button onClick={()=>setDrawer(false)}  sx={{ color:"#fff" }}>Add Friends</Button></Link>

             <a style={{paddingLeft:"0px"}}> <Button sx={{textColor:"#FFFFFF",color:"#FFFFFF",textAlign:"left",paddingLeft:"0px"}} href="https://drive.google.com/file/d/1rVfqyZF8uD5zAJhOcd0YqwRak_PISEfj/view?usp=sharing" target={" "} >APK</Button></a>
            <Button sx={{textColor:"#FFFFFF",color:"#FFFFFF",textAlign:"left"}}  minWidth href="https://drive.google.com/file/d/1698nyqMNmiHEuP1_5crfDfzbjpl_DJZB/view?usp=sharing" target={" "} >Other Projects</Button>
            </Grid>
            
          </SwipeableDrawer>

            </Box>


      
       




            
    </AppBar>
    </div>
      }
    </Box>
    
 
 

  )
}

export default NavBar;
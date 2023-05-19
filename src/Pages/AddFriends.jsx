import React from 'react'
import Axios from 'axios'
import { useState,useEffect,useContext  } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton, ListItemButton, ListItemIcon,Icon, TextField, Button,Box ,Snackbar,InputBase, ButtonBase} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NoteContext from "../context/noteContext"
import {styled,alpha} from "@mui/material/styles"
import theme from "../Theme"
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "0px",
  borderTopLeftRadius:"7px",
  borderBottomLeftRadius:"7px",
  backgroundColor: "#ccffdc",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: " #99ffb9",
  },
 
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity:0.65
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AddFriends = () => {
           

   const a= useContext(NoteContext);

    const [Data, setData] = useState([])
    const [openSnack, setopenSnack] = useState(false)
  //  useEffect(() => {
  //    Axios.get("http://localhost:5000/addFriends").then(response => {

  //    console.log(response);
  //     setData(response.data);
  //    })
   
  //  },[ ])

   const SendRekuest= async(targetId)=>{
      await Axios.post("https://nice-plum-panda-tam.cyclic.app/sendRekuest",{senderId: a.id, targetId: targetId}).then(response => {
         setopenSnack(true)
       })

   }

   const handleSubmit = (event) => {
      event.preventDefault();
      const Data= new FormData(event.currentTarget)
      Axios.get(`https://nice-plum-panda-tam.cyclic.app/showAddFriends/${Data.get("search")}`).then((response) => {console.log(response)
            setData(response.data)})

   }
   

console.log("data",Data)
  return (
    <> 
      
    <List sx={{ maxWidth: 360 ,marginLeft:{xs:"3px",sm:"auto"},marginRight:{xs:"3px",sm:"auto"}}}>
     <ListItem> <div>
        <Typography component="h6" variant='h6' sx={{mb:"5px"}}>
            Send Requests
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{display:"flex",justifyContent:"center"}} >
        <Search sx={{display:"inline-block"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="search"
              label="search"
              type="search"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

        {/* <TextField name="search" label="search" type="search" ></TextField> */}
        <Button variant="contained" sx={{p:"0px",paddingX:2,mr:"auto",boxShadow:"none",  borderRadius: "0px",
  borderTopRightRadius:"7px",
  borderBottomRightRadius:"7px",}} type="submit">Search</Button>
        </Box>
    </div>
    </ListItem>

    <Divider variant='middle '></Divider>
    {
      Data &&  Data.map((element)=>{
           console.log(element.name)
            return(
                <>
                <ListItem alignItems="center">
      
                <ListItemAvatar>
                  <Avatar  >
                    {element.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={element.name}
                 
                />
                <IconButton onClick={()=>{SendRekuest(element._id)}}>
                    <Icon>
                      <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>
                    </Icon>
                    

               </IconButton>

              </ListItem>
              <Divider variant="inset" component="li" />

              </>
            )


        })


    }
     <Snackbar
        anchorOrigin={{vertical:"top", horizontal: "center" }}
        open={openSnack}
        onClose={()=>{setopenSnack(false)}}
        message="Rekuest sent successfully"
       // key={vertical + horizontal}
      />
 
      
    </List>
    </>

  )
}

export default AddFriends
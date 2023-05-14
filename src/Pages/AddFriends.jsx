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
import { IconButton, ListItemButton, ListItemIcon,Icon, TextField, Button,Box ,Snackbar} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NoteContext from "../context/noteContext"

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
      
    <List sx={{ maxWidth: 360 ,marginLeft:"auto",marginRight:"auto"}}>
     <ListItem> <div>
        <Typography component="h6" variant='h6' sx={{mb:"5px"}}>
            Send Requests
        </Typography>
        <Box component="form" onSubmit={handleSubmit} >

        <TextField name="search" label="search" type="search" ></TextField>
        <Button variant="contained" sx={{marginTop:"10px",ml:"5px"}} type="submit">Search</Button>
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
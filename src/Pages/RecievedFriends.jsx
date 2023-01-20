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
import { IconButton, ListItemButton, ListItemIcon,Icon } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NoteContext from "../context/noteContext"

const RecievedFriends = () => {
           

   const a= useContext(NoteContext);

    const [Data, setData] = useState([])

    
   useEffect(() => {
     Axios.get(`https://nice-plum-panda-tam.cyclic.app/showRekuests/${a.id}`).then(response => {

     console.log("showRekuests", response);
      setData(response.data.rekuestRecieved);
     })
   
   },[ ])

   const AcceptRekuest=(targetId)=>{
       Axios.put("https://nice-plum-panda-tam.cyclic.app/acceptRekuest",{senderId: a.id, targetId: targetId}).then(response => {
          console.log(response);
          setData(Data && Data.map((item)=>{
               return item._id!=targetId;
        
          }))
          if(Data.length==0){
            setData("no rekuests")
          }
       })

   }
   
  console.log("received rekuesests data:", Data)

  return (
    <> 

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' ,marginLeft:"auto",marginRight:"auto"}}>
     <ListItem> <div>
        <Typography component="h5" variant='h5' >
        Requests
        </Typography>
    </div>
    </ListItem>

    <Divider variant='middle '></Divider>
    {
      Data &&  Data.map((element)=>{
           
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
                <IconButton onClick={()=>{AcceptRekuest(element._id)}}>
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
 
      
    </List>
    </>

  )
}

export default RecievedFriends
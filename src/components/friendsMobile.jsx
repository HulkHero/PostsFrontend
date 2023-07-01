import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Collapse, IconButton,} from '@mui/material';
import Typography from '@mui/material/Typography';
import Axios from "axios";
import NoteContext from "../context/noteContext";
import {useEffect,useContext} from "react";
import "./fri.css"
import FriendItem from './frienditem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDeleteFriendRK, useMyFriendsRK } from '../reactKueries/MyFriendsRK';        
export default function FriendsMobile() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

   const a= useContext(NoteContext);
  
 
   const {data,isLoading,isError,error}=useMyFriendsRK(a.id,a.token);   
     const {mutate:deleteFriend}=useDeleteFriendRK(a.id);

    const DeleteFriend=async (id,index)=>{

      deleteFriend({userId:a.id,targetId:id,token:a.token});
     
    }

    if(isError){

      return <Typography sx={{ml:"20px"}}>{error.messege}</Typography>

    }

  

  return (
    <> 
    <div style={{minWidth:"95%",maxWidth:"100%",}}>
    <List sx={{}} >
     <ListItem> 
        <Typography component="h6" variant='h6' >
            Friends
        </Typography>
        <IconButton onClick={handleClick} size='small' sx={{marginLeft:"auto"}}>
         
          {open==false?<ExpandMoreIcon />:<ExpandLessIcon />}
         
         </IconButton>
        
   
       
    </ListItem>
    <Divider variant='middle '></Divider>
    <Collapse in={open} timeout="auto" unmountOnExit>
    {data?.length>0 ? data.map((element,index)=>{
          // let img12= avatar[index]
          // console.log(img12,"img12")
          const base64= btoa(new Uint8Array(element.avatar.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
         
        const img=`data:image/png;base64,${base64}`
     return(
      <>
       <FriendItem key={index}  props={element} index={index} DeleteFriend={DeleteFriend} img={img} id={a.id} ></FriendItem>
     </>)
    })
    
    : <>{isLoading? <Typography sx={{ml:"20px"}}>{"Loading..."}</Typography>:<Typography sx={{ml:"20px"}}>No Friends</Typography>
  }</>
    }
    </Collapse>
    </List>
    </div>
    
    </>
  );
}



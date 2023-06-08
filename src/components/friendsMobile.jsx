import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { Collapse, IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import Axios from "axios";
import NoteContext from "../context/noteContext";
import {useState ,useEffect,useContext} from "react";
import "./fri.css"
import FriendItem from './frienditem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
export default function FriendsMobile() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

   const a= useContext(NoteContext);
  const [data, setData] = useState([]);
    const [text, setText] = useState("");
    useEffect(() => {
      if(a.id){
    // Axios.get(`https://nice-plum-panda-tam.cyclic.app/showFriends/${a.id}`).then((res) => {
    //   console.log(res,"hellllll");
    //   setAvatar(res.data.img)
    //   console.log(res.data.img,"her")
    //  setData(res.data.user.friends);
    // }) } 
     setText("Loading...")
    Axios.get( `https://nice-plum-panda-tam.cyclic.app/myFriends/${a.id}`).then((res) => {
      console.log("resFriends",res)
      if(res.data=="error2"){

       setText("No Friends")
       
      }
      else{
        setData(res.data);
      }
    
    }
      ).catch((err) => {
        setText("No Friends")
        console.log(err)})
      }
    }, [a.id])
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
    {data.length>0 ? data.map((element,index)=>{
          // let img12= avatar[index]
          // console.log(img12,"img12")
          const base64= btoa(new Uint8Array(element.avatar.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
         
        const img=`data:image/png;base64,${base64}`
     return(
      <>
       <FriendItem  props={element} img={img} id={a.id} ></FriendItem>
     </>)
    })
    
    :<Typography sx={{ml:"20px"}}>{text}</Typography>
    }
    </Collapse>
    </List>
    </div>
    
    </>
  );
}



import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Axios from "axios";
import NoteContext from "../context/noteContext";
import {useState ,useEffect,useContext} from "react";
import "./fri.css"
import FriendItem from './frienditem';

export default function AlignItemsList() {

  const a = useContext(NoteContext)
    const [data, setData] = useState([]);
    
    useEffect(() => {
      if(a.id){
    // Axios.get(`https://nice-plum-panda-tam.cyclic.app/showFriends/${a.id}`).then((res) => {
    //   console.log(res,"hellllll");
    //   setAvatar(res.data.img)
    //   console.log(res.data.img,"her")
    //  setData(res.data.user.friends);
    // }) } 
    Axios.get( `https://nice-plum-panda-tam.cyclic.app/myFriends/${a.id}`).then((res) => {
      console.log("resFriends",res.data)
      setData(res.data)}
      )
      }
    }, [])
    

  return (
    <> 

    <List sx={{ width: '100%', maxWidth: 360, backgroundColor:"#f0f2f5",ml:"2%" }}>
     <ListItem> <div>
        <Typography component="h6" variant='h6' >
            Friends
        </Typography>
    </div>
    </ListItem>
    <Divider variant='middle '></Divider>
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
    :<Typography sx={{ml:"20px"}}>No Friends to show</Typography>
    }
    </List>
    
    </>
  );
}

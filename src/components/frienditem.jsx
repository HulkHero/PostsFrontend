import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Axios from "axios"
const FriendItem = (props) => {
     const [show, setShow] = useState(false);
    //  const [text, setText] = useState("");
    //  console.log("props",props.id)
    //  useEffect(()=>{
    //     if(show){
    //         console.log("inside useEFFEct friend ")
    //         Axios.get(`https://nice-plum-panda-tam.cyclic.app/getStatus/${props.id}/${props.props._id}`).then((response)=>{
                
    //             console.log(response)
    //             setText(response.data[0].Status)
              
    //         }).catch((error)=>{
    //             console.log(error)
    //         })
            
    //     }
    //  },[show])

  return (
    <>
    <ListItem alignItems="center">
      
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={props.img}>
          
        </Avatar>
      </ListItemAvatar>
      <div >
      <ListItemText onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)}
        primary={props.props.createrId.name}
        sx={{":hover":{
            cursor:"pointer",
            textDecoration:"underline"
        }}}
      >
      </ListItemText>
       {show? <div style={{position:"absolute",minWidth:"150px",zIndex:"10000",backgroundColor:"white",marginLeft:"10px",padding:"10px",borderRadius:"10px",boxShadow:"0px 0px 10px 1px #0097a7"}} >Status: {props.props.Status}</div>
       :" "
  }
  </div>
    </ListItem>
    <Divider variant="inset" component="li" />
    </>
  )
}

export default FriendItem
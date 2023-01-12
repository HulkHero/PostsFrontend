import React,{memo} from 'react'
import { Card,CardHeader,Avatar,CardMedia,CardContent,Typography,CardActions,IconButton, Container, CardActionArea,Modal,Backdrop,Box,Fade } from '@mui/material';
import {red} from"@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';

import NoteContext from '../context/noteContext';
import {useState,useEffect} from "react"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

const Cards = (props) => {  
  const a= useContext(NoteContext)
    console.log("a.id",a.id)
  const [like, setLike] = useState(false)
  const [modal, setModal] = useState(false)
  const [num, setnum] = useState(props.likes.length)
 // const base64= btoa(String.fromCharCode(...new Uint8Array(props.image)));
  var date = new Date(props.date);
  var options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
};
let likess
var result = date.toLocaleDateString('en', options);


  useEffect(() => {
    if (props.likes?.includes(a.id)){
      setLike(true)
    }
      
  }, [])

  // useEffect(() => {
  //   Axios.get(`http://localhost:5000/likes/${props.id}/${a.id}`).then((response)=>{
          
      
  //   })


  // }, [num])
  
  

  return (
    <Card elevation={3} sx={{  maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {props.name[0]}
          </Avatar>
        }
        action={
          props.isMyPosts==true? 
          <IconButton onClick={()=>{props.onDelete(props.id)}}>
           <DeleteIcon  ></DeleteIcon>
          </IconButton>:
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        }
        title={props.name}
        subheader={result}
      />
      <Typography variant="h5" component="h5" sx={{paddingLeft:"6px"}}>{props.heading}</Typography>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={()=>setModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
           <img src={props.image} style={{height:"500px",width:"650px"}}>
           </img>
          </Box>
        </Fade>
      </Modal>
        <CardActionArea   onClick={()=>{setModal(true);console.log("open")}}>
      <Container sx={{display: "flex", justifyContent:"center"}}>
      <CardMedia
        component="img"
        image={props.image}
        alt="Paella dish"
        sx={{maxHeight:"300px",maxWidth:"400px",mt:2,position:"center",justifyContent:"center",objectFit:"scale-down"}}
      
      />
      </Container>
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {props.caption}
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton onClick={()=>{ if(like==true){props.ondislike(props.id,props.index);
        // setnum(props.likes.length--);
        setLike(false)
       }else{
          props.onlike(props.id,props.index);
          setLike(true)
          // setnum(props.likes.length++)
        }}} >
         {  like==true? <FavoriteIcon sx={{color:'#ab0909'}} />  :<FavoriteBorderIcon></FavoriteBorderIcon>    
         }
        </IconButton>
        <Typography variant="body1" color="text.primary" sx={{alignSelf:"center"}}>{props.displayLikes? props.displayLikes :props.likes.length}</Typography>
        <Typography variant="h2" color="text.primary" sx={{alignSelf:"center"}}>{"hello"+props.index}</Typography>
        
        </CardActions>
        </Card>
        

  )
}

export default memo(Cards)

// <IconButton onClick={()=>{setLike(!like);  if(like==true){props.ondislike(props.id);setnum(props.likes.length++)
// }else{
   
//    props.onlike(props.id);
//    setnum(props.likes.length--)
//  }}} >
//   {  like==true? <FavoriteIcon color="error" />  :<FavoriteBorderIcon></FavoriteBorderIcon>    
//   }
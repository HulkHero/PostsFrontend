import React,{memo} from 'react'
import { Card,CardHeader,Avatar,CardMedia,CardContent,Typography,CardActions,IconButton, Container, CardActionArea,Modal,Backdrop,Box,Fade,styled ,Button} from '@mui/material';
import {red} from"@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from 'react';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import NoteContext from '../context/noteContext';
import {useState,useEffect} from "react"
import { useTheme } from '@mui/material';
import "./fri.css"
import CommentsModal from './Comments/CommentsModal';
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

const LikeIcon=styled(FavoriteIcon)(({ theme })=>({
 color:'#ab0909',
//  animationName: "arrow",
//  animationDuration:"3.7s",
//  animationIterationCount: "1",

//  "@keyframes arrow":{
//   "0%": {
//     transform: "scale(1)",
   
//   },
//   "20%": {
//     transform: "scale(1.5)",

//   },
//   "100%": {
//     transform: "scale(1)",
   
//   },

//  }
}
))

const Cards = (props) => {  
  const a= useContext(NoteContext)
  const [like, setLike] = useState(false)
  const [modal, setModal] = useState(false)
  const [animate, setAnimate] = useState(false)

      
 // const base64= btoa(String.fromCharCode(...new Uint8Array(props.image)));
  var date = new Date(props.date);
  var options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
};
var result = date.toLocaleDateString('en', options);
   const theme=useTheme();
  useEffect(() => {
    if (props.likes?.includes(a.id)){
      setLike(true)
    }
      
  }, [a.id])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  

  return (
    <Card elevation={3} sx={{ mr:"auto",ml:"auto", maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
      <CardHeader
             sx={{":hover":{
              cursor:"default"
             }}}
        avatar={
          <Avatar  sx={{width:"50px",height:"50px" ,bgcolor: red[500] }} alt={props.name[0]} src={props.imgAvatar}>
           
          </Avatar>
        }
        action={
          props.isMyPosts===true? 
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
      <Typography variant="h5" component="h5" sx={{paddingLeft:2}}>{props.heading}</Typography>
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
           <img src={props.image} alt='img' style={{height:"500px",width:"650px"}}>
           </img>
          </Box>
        </Fade>
      </Modal>
        {props.image?<CardActionArea   onClick={()=>{setModal(true);console.log("open")}}>
      <Container sx={{display: "flex", justifyContent:"center"}}>
      <CardMedia
        component="img"
        image={props.image}
        alt="Paella dish"
        sx={{maxHeight:"300px",maxWidth:"400px",position:"center",justifyContent:"center",objectFit:"scale-down"}}
      
      />
      </Container>
      </CardActionArea>:""}
      <CardContent sx={{paddingY:"12px"}}>
        <Typography variant="body2" color="text.secondary">
         {props.caption}
        </Typography>
      </CardContent>
      <CardActions >
        <IconButton disableRipple={true} onClick={()=>{ if(like==true){props.ondislike(props.id,props.index);
        // setnum(props.likes.length--);
        setLike(false)
       }else{
          props.onlike(props.id,props.index);
          setLike(true)
          setAnimate(true)
          // setnum(props.likes.length++)
        }}} >
         {  like==true? <LikeIcon className={animate==true?"likeIconAnimation":" "}  />  :<FavoriteBorderIcon ></FavoriteBorderIcon>    
         }
        </IconButton>
        <Typography variant="body1" color="text.primary" sx={{alignSelf:"center"}}>{props.displayLikes? props.displayLikes :props.likes.length}</Typography>
        <Box sx={{ml:"auto", display:"flex",justifyContent:"center",alignItems:"center"}} >
        {/* <IconButton onClick={handleClickOpen}> */}
           {/* <CommentRoundedIcon/> */}
        {/* </IconButton> */}
         <Button variant="text" disabled={!props.allowComments} onClick={handleClickOpen} sx={{color:`${theme.palette.grey[700]}`,textDecoration:"none"}} disableElevation={true} disableFocusRipple={true}    startIcon={<CommentRoundedIcon/>}>Comments</Button>
         {/* <Typography variant="body2" color="text.primary" sx={{alignSelf:"center"}}>{`comments`}</Typography> */}
        </Box>
        <CommentsModal  userId={props.userId} postId={props.id} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} ></CommentsModal>
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
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Menu,Button } from '@mui/material'
import React,{useState} from 'react'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
const FriendItem = (props) => {
     const [show, setShow] = useState(false);
     const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
       setAnchorEl(null);
     };
     
  return (
    <>
    <ListItem alignItems="center"   
                  secondaryAction={
                    <>
                    <IconButton edge="end" sx={{mr:0.1}} onClick={handleClick} aria-label="options">
                     <MoreVertRoundedIcon></MoreVertRoundedIcon>
                    </IconButton>
                                    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Button  disableElevation={true} color="error" sx={{textTransform:'none'}} onClick={()=>{props.DeleteFriend(props.props.createrId._id,props.index); handleClose()}}>Unfriend</Button>
      
                                 </Menu>
                     </>
                  }>
    
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={props.img}>
          
        </Avatar>
      </ListItemAvatar>
     
      <ListItemText onMouseOver={()=>setShow(true)} 
       onTouchEnd={()=>setShow(false)}
        onTouchMove={()=>setShow(false)}
         onMouseOut={()=>setShow(false)}
        primary={props.props.createrId.name}
        sx={{":hover":{
            cursor:"pointer",
            textDecoration:"underline"
        },
        mr:"auto"}}
      >
      </ListItemText>
      {/* <IconButton sx={{ml:"auto"}}>
        <MoreVertRoundedIcon size="small"></MoreVertRoundedIcon>
      </IconButton> */}
 
       {show? <div style={{position:"absolute",top:40,left:10,minWidth:"150px",zIndex:"1000000",backgroundColor:"white",marginLeft:"10px",padding:"10px",borderRadius:"10px",boxShadow:"0px 0px 10px 1px #0097a7"}} >Status: {props.props.Status}</div>
       :" "
  }
 
    </ListItem>
    <Divider variant="inset" component="li" />
    
    </>
  )
}

export default FriendItem
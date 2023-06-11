import * as React from "react"
import { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box,InputBase ,styled} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
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
  minWidth:"calc(150px+6rem)",
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: '100%',
    minWidth:450
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));


const Comment = (props) => {
  const [loader, setLoader] = useState(false);
  const [data,setData]=useState([])
  const [loadText,setLoadText]=useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true)
    if(event.currentTarget.search.value==""){
      setLoader(false)
      alert("Please enter a comment")
    }
    else{
      const Data= new FormData(event.currentTarget)
    axios.post(`https://nice-plum-panda-tam.cyclic.app/addComment/${props.postId}/${props.userId}`,{text:Data.get("search")}).then((response) => {console.log(response)
    setLoader(false)
          event.target[0].value="";
          getComments()
        })
  }
}

const getComments=async()=>{
  setLoadText("Loading...")
  axios.get(`https://nice-plum-panda-tam.cyclic.app/getComments/${props.postId}`).then(res=>{
    console.log(res)
    setData(res.data)
    if(res.data.length==0){
      setLoadText("No Comments")
    }
    else{setLoadText("")}
  }).catch(err=>{
    console.log(err)
    setLoadText(err.message)
  })
}

  useEffect(()=>{
    getComments()
 },[])

  return (
    <>
    <Box component="form" onSubmit={handleSubmit} sx={{display:"flex",justifyContent:"center",width:"100%"}}>
    <Search sx={{display:"inline-block",flexGrow:3}}>
           
            <StyledInputBase
              name="search"
              label="search"
              type="search"
              placeholder="Add a comment..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{width:"100%"}}
            />
          </Search>
          <LoadingButton loading={loader} variant="contained" sx={{p:"0px",paddingX:2,mr:"auto",boxShadow:"none",  borderRadius: "0px",
  borderTopRightRadius:"7px",
  borderBottomRightRadius:"7px",}} type="submit">Add</LoadingButton>
       

     
    </Box>
    <Divider variant="fullWidth" sx={{mt:2}} />
    <List sx={{ width: '100%', bgcolor: 'background.paper' ,overflow:"auto"}}>
    {data.length>0? data.map((item,index)=>{
       const base641= btoa(new Uint8Array(item.userId.profile.avatar.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
   
    const imgAvatar=`data:image/png;base64,${base641}`
      return(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={imgAvatar} />
        </ListItemAvatar>
        <ListItemText
          primary={item.userId.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.comment}
              </Typography>
            
            </React.Fragment>
          }
        />
      </ListItem>



      )
    }):<ListItem><ListItemText>{loadText}</ListItemText></ListItem>}
  
   
    
   
  </List>
  </>

  )
}

export default Comment
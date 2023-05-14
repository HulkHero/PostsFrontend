import React from 'react'
import Axios from 'axios'
import { useState,useContext,useRef,useEffect } from 'react';
import { Button, TextField ,Grid, Snackbar, Alert,styled,IconButton} from '@mui/material';
import NoteContext from "../context/noteContext"
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
const CssTextField = styled(TextField)({
  maxWidth:"600px",
  marginTop:"20px",
   ".MuiFormLabel-root":{
    textColor:"black",
    color:"black",
  
   },

   "& .MuiInputBase-input":{
    color:"black",
  
    minWidth:"250px",

   },

  '& label.Mui-focused': {
    color: '#0097a7',
   
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0097a7',
    },
    '&:hover fieldset': {
      borderColor: '#0097a7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0097a7',

     
    },
  },
});

const AddPosts = () => {
  const a = useContext(NoteContext)

  if (a.token)
  {}
    else{
    const getToken=sessionStorage.getItem("token");
   
      const getid=sessionStorage.getItem("id");
      const getcreatername=sessionStorage.getItem("creatername");
    if(getToken!==undefined){
      a.setToken(getToken)
      a.setId(getid)
      a.setcreatername(getcreatername)
    }
  }
  const [file, setFile] = useState();
  const [user, setUser] = useState({
    heading:"",
    caption:"",
    _id:a.id,
    creatername:a.creatername,
    
  });
  const [openSnack, setOpenSnack] = useState(false)
  
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      console.log("filereade")
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      console.log(pickedFile);
      setIsValid(true);
      setUser({...user,image:pickedFile});
      console.log("file",file)
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };



  const handleChange = (e) => {
    setUser((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

 const onSubmit=(e)=>{
  e.preventDefault();
  console.log("user",file)
  const formData= new FormData();
  formData.append("heading",user.heading)
  formData.append("caption",user.caption)
  formData.append("id",user._id)
  formData.append("creatername",user.creatername)
  file?formData.append("image",file):console.log("no image");
  console.log(formData)
  for (var key of formData.entries()) {
    console.log(key[0] + ', ' + key[1])
  }
  if(a.token){
    Axios.post("https://nice-plum-panda-tam.cyclic.app/addStory",formData,{headers:{'content-type': 'multipart/form-data'}}).then((response)=>{
      console.log(response)
      setOpenSnack(true)   
     })
  }
  else{
    console.log("login first")
  }
     
  }
  return (
    <div style={{backgroundColor:"#f0f2f5",minHeight:"90vh",display:"flex",justifyContent:"center"}}>
    <Grid container   sx={{ maxWidth:{xs:"90%",sm:"45%"},maxHeight:"50vh", display: 'flex',justifyContent: 'center', mt:"20px",backgroundColor:"#ffffff",borderRadius:"40px"} }>
      <form onSubmit={(e)=>onSubmit(e)}>
      <Grid item xs={12} ><CssTextField type="heading" label="heading" value={user.heading} name="heading" id="outlined-basic"  onChange={(e)=>handleChange(e)}
      sx={{ ':hover':{
        borderColor: "#cde8cc",
        borderRadius: "50px",
      }, marginTop:"2.4rem"}}
      ></CssTextField>
      <Grid item xs={12}><CssTextField label="caption" type="caption" value={user.caption} name="caption" id="outlined-basic" onChange={(e)=>handleChange(e)}></CssTextField></Grid>
      </Grid> 
          <Grid item xs={12}>
          <input
        
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div style={{maxWidth:"200px",maxHeight:"300px"}}>
          {previewUrl && <img src={previewUrl} style={{maxWidth:"200px",maxHeight:"300px"}} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
         <Button variant="contained" startIcon={<AddAPhotoRoundedIcon />} sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}  type="button" onClick={pickImageHandler}>
          
         </Button>
          </Grid>

      <Grid item xs={12} sx={{display:"flex",flexDirection:"row"}}><Button variant="contained" type="submit" sx={{alignSelf:"flex-end",marginLeft:"auto",mt:"20px",width:"100%"}}>Post</Button></Grid>
      </form>
      <Snackbar open={openSnack} autoHideDuration={4000} onClose={()=>setOpenSnack(false)}>
  <Alert onClose={()=>{setOpenSnack(false)}} severity="success" variant="filled" sx={{ width: '100%' }}>
    Post Added
  </Alert>
</Snackbar>


    </Grid>
    </div>
  )
}

export default AddPosts;
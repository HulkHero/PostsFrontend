import React from 'react'
import Axios from 'axios'
import { useState,useContext,useRef,useEffect } from 'react';
import { Button, TextField ,Grid, Snackbar, Alert,styled,Switch, Typography} from '@mui/material';
import NoteContext from "../context/noteContext"
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik,Form,Field ,ErrorMessage} from 'formik';
import { AddPostValidation } from '../Validations/AddPostValidation';
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
  const [loader, setLoader] = useState(false)
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
    allowComment:true,
    
  });
  const initalValues={
    heading:"",
    caption:"",
  }
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
   const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };


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

  const handleToggle=()=>{
    console.log("toggle",user.allowComment)
    setUser((prev)=>({
      ...prev,
      allowComment:!prev.allowComment
    }))
  }

 const onSubmit=(values,props)=>{ 
  setLoader(true)
  console.log("user",values)
  const formData= new FormData();
  formData.append("heading",values.heading)
  formData.append("caption",values.caption)
  formData.append("id",user._id)
  formData.append("creatername",user.creatername)
  formData.append("allowComment",user.allowComment)
  file?formData.append("image",file):console.log("no image");
  console.log(formData)
  for (var key of formData.entries()) {
    console.log(key[0] + ', ' + key[1])
  }
  if(a.token){
    Axios.post("https://nice-plum-panda-tam.cyclic.app/addStory",formData,{headers:{'content-type': 'multipart/form-data'}}).then((response)=>{
      console.log(response)
      setLoader(false)
      setOpenSnack(true)   
      props.resetForm()
     })
  }
  else{
    console.log("login first")
  }
     
  }
  return (
    <div style={{backgroundColor:"#f0f2f5",minHeight:"95vh",display:"flex",justifyContent:"center"}}>
    <Grid container   sx={{ maxWidth:{xs:"90%",sm:"45%"},maxHeight:"55vh", display: 'flex',justifyContent: 'center', mt:"20px",backgroundColor:"#ffffff",borderRadius:"40px"} }>
     <Formik  validationSchema={AddPostValidation} initialValues={initalValues} onSubmit={onSubmit} >
     {(props)=>
      <Form>
           <Grid item xs={12} ><Field as={CssTextField}    label="heading"  name="heading" 
            sx={{ ':hover':{
              borderColor: "#cde8cc",
              borderRadius: "50px",
            }, marginTop:"2.4rem"}}
            error={props.errors.heading && props.touched.heading}
            helperText={<ErrorMessage name="heading" />}
            ></Field>
            </Grid> 
            <Grid item xs={12} sx={{mb:2}}><Field as={CssTextField} label="caption" name="caption" 
            error={props.errors.caption && props.touched.caption}
            helperText={<ErrorMessage name="caption" ></ErrorMessage>} ></Field></Grid>
                <Grid item xs={12}>
                <input
              ref={filePickerRef}
              style={{ display: 'none' }}
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={pickedHandler}
            />
            <div style={{maxWidth:"200px",maxHeight:"300px",marginLeft:"auto",marginRight:"auto",marginTop:2}}>
                {previewUrl && <img src={previewUrl} style={{maxWidth:"200px",maxHeight:"300px"}} alt="Preview" />}
                {/* {!previewUrl && <p>Please pick an image.</p>} */}
              </div>
               <Button variant="contained" startIcon={<AddAPhotoRoundedIcon />} sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",mt:2}}  type="button" onClick={pickImageHandler}>  
               </Button>
                </Grid>
           <Grid xs={12} sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} > 
           <Typography sx={{mt:2,mb:1}}>Allow Comments</Typography>
           <Switch sx={{mt:1}} checked={user.allowComment} onChange={handleToggle} size='medium'  inputProps={{ 'aria-label': 'controlled' }}/></Grid>
<Grid item xs={12} gutterBottom sx={{display:"flex",flexDirection:"row"}}><LoadingButton loading={loader} variant="contained" type="submit" sx={{alignSelf:"flex-end",marginLeft:"auto",mt:2,width:"100%",maxHeight:"32px"}}>Post</LoadingButton></Grid>
            </Form>
     }
      </Formik> 
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
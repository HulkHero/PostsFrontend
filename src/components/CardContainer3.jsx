import React from 'react'
import {Paper,Button,Box, Skeleton, Card, CardHeader, CardMedia} from "@mui/material"
import { useState ,useEffect} from 'react'
import Cards from './Cards';
import Axios from "axios";
import axios from 'axios';
import { useContext } from 'react';
import NoteContext from '../context/noteContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch,useSelector } from 'react-redux';
import { addData ,concatData, like,dislike,fetchMoreData,setSkip} from '../store';
import {store} from "../store";
import { VariableSizeList } from 'react-window';
import CardSkeleton from './Skeleton';
const CardContainer = () => {

 // var data;
 const a= useContext(NoteContext)

 const [lik,setLik]=useState()

 const dispatch = useDispatch();

// var skip=0;
 var limit=2;
 if (a.token)
 {}
 else{
   const getToken=sessionStorage.getItem("token");
  
     const getid=sessionStorage.getItem("id");
     const getcreatername=sessionStorage.getItem("creatername");
   if(getToken!==null){
     a.setToken(getToken)
     a.setId(getid)
     a.setcreatername(getcreatername)
   }
 }

 const dataRedux=useSelector((state)=> state.data.value )
 const skip=useSelector((state)=> state.data.skip )
   
  
    useEffect(() => {
      if(dataRedux.length>0){

      }
      else{

        Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${limit}`,{
          headers:{
            authorization : a.token,
          }
        }).then((response)=>{
          console.log("response")
          
          console.log("response",response)
          dispatch(setSkip())
         // setData(response.data)
          dispatch(addData(response.data))  
          
          
        })
      }
      

    },[])

    const onlike=(id,key)=>{
      if (a.id){
        dispatch(like({userid:a.id,key:key}))
        Axios.put(`https://nice-plum-panda-tam.cyclic.app/likePost/${id}/${a.id}`).then((response) => {
         
          console.log("response:dislike", response)
          setLik(response.data.likes.length);
          console.log(lik)
      
        })

      }
      else{ console.log("login first")}
     

    }
    const ondislike=(id,key)=>{
      dispatch(dislike({userid:a.id,key:key}))
      Axios.put(`https://nice-plum-panda-tam.cyclic.app/dislikePost/${id}/${a.id}`).then((response) => {
        setLik(response.data.likes.length);
           
     
      })

   }
   const more= useSelector((state)=> state.data.fetchMore )
   console.log("more",more)

   console.log("rendering")

   const fetchMoreData1=async()=>{
    if(more===true){

    
    
    console.log("inside fetchMoreData")
    
    
    console.log("skip",skip)
    console.log("limit",limit)
    await Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${1}`).then((response)=>{
       

      
        console.log("response",response)
         dispatch(setSkip())
        dispatch(concatData(response.data))
       // setData(data.concat(response.data))
      

    }).catch(response=>{
      console.log("response error",response)
      if (response.response.status ==300){
        console.log("300")
      
        dispatch(fetchMoreData())
      }
    })}
   }
   const isItemLoaded = (index) => {
    // Check if the item at the given index is loaded
    const item = dataRedux[index];
    return !!item; // Return true if item exists, false otherwise
  };
    const getItemSize = (index) => {
    // Get the height of the item at the given index
    const item = dataRedux[index];
    if (item && item.image && item.image.data) {
      return 500; // Item with image
    } else if (item){
      return 250; // Item without image
    }
    else{
        return 500;
    }
  };
    const itemCount = more?dataRedux.length+1:dataRedux.length;

   const Item = ({ index, style }) => {
    const item= dataRedux[index];

     console.log("index",index)
     console.log("style",style)
     if (!item) {
       // If the item isn't loaded, display a loading placeholder
       return(
        <div style={style} >
         <CardSkeleton></CardSkeleton>
         </div>
       )
     }
   let base64 = null;
          let img=null;
          if (item.image.data) {
            base64 = btoa(
              new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, '')
            );
           img=`data:image/png;base64,${base64}`;
          } else {
            console.log('no image');
          }

           const base641= btoa(new Uint8Array(item.creater.profile.avatar.data.data).reduce(function (data, byte) {
             return data + String.fromCharCode(byte);
         }, ''));
        
         const imgAvatar=`data:image/png;base64,${base641}`
  

   return (
     <>
    
      <div style={style}>
         <Cards key={index} index={index}  imgAvatar={imgAvatar} ondislike={ondislike} userId={a.id} likes={item.likes} id={item._id} name={item.creatername} date={item.date} image={img}  heading={item.heading} caption={item.caption} onlike={onlike} displayLike={lik} isMyPosts={false}></Cards>
      </div>
     </>
     
   )
}
  return (
    <>
   {
    <Paper evaluation={0} sx={{minWidth:"100%",display:"flex:",flexDirection:"column",alignItems:"center",border:"0px",boxShadow:"none",justifyContent:"center",minHeight:"100%",backgroundColor:"#f0f2f5"}} spacing={2}>
    { dataRedux.length > 0 ? 
    <InfiniteScroll
     dataLength={dataRedux.length}
     next={fetchMoreData1}
     hasMore={more}
     loader={ 
      <div style={{ display: 'flex',justifyContent:"center" }}>
      <Box sx={{ display: 'flex',justifyContent:"center" }}>
      <h4 >Loading...</h4>
    </Box>
    </div>
    }
   
    //  endMessage={
    //   <p style={{ textAlign: "center" }}>
    //     <b>Khatam!!!</b>
    //   </p>
    //}
    >  
    <VariableSizeList
    className="List"
    height={900}
    itemCount={itemCount}
    itemSize={(index)=>getItemSize(index)}
   
    width={"100%"}
    >
        
        {Item}
    </VariableSizeList>    
    

</InfiniteScroll>
   :<CardSkeleton></CardSkeleton>}
    </Paper>
}
    </>
  )
}

export default CardContainer

/*
 <>
   
    <Paper evaluation={2} style={{minWidth: "100%",display:"flex:",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#cde8cc"}} spacing={2}>
          
    {data && data.map((element)=>{

       return (
        <div style={{display: 'flex',flexDirection: 'column',alignItems:"center"}}>
       

        {element.Posts.map((posts)=>{
        
      const base64= btoa(new Uint8Array(posts.image.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
        
        //const base64= btoa(String.fromCharCode(...new Uint8Array(posts.image.data.data)));
       //const base64= btoa(String.fromCharCode(...new Uint8Array(posts.image.data.data)));
        console.log("base64",base64)
         const img=`data:image/png;base64,${base64}`
       
          return(
            <>
         
            <Cards key={element._id} name={element.name} date={posts.date} image={img}  heading={posts.heading} caption={posts.caption}></Cards>
            </>
            )

        })}
        </div>
      )
       
    })}


    </Paper>
    </>*/

    // const cancelToken=Axios.CancelToken.source()
    // Axios.get("http://localhost:5000/",{cancelToken:cancelToken.token}).then((response) => {
    //  console.log("response:data", response)
    //   setData(response.data)
    //  }).catch((error) => {
    //      if(axios.isCancel(error)){
    //        console.log("error:cancel",error)
    //      }
    //  })

    //  return(()=>{
    //    cancelToken.cancel()

    //  }
    //  )
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
import { addData ,concatData, like,dislike,fetchMoreData,setSkip, RefreshAllData, fetchFirstData,setsavedScroll} from '../store';
import {store} from "../store";
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
 const firstfetch=useSelector((state)=> state.data.firstFetch )
 const skip=useSelector((state)=> state.data.skip )
   
  
    useEffect(() => {
      if(dataRedux.length>0){

      }
      else{

        Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${0}/${4}`,{
          headers:{
            authorization : a.token,
          }
        }).then((response)=>{
          dispatch(setSkip())
         // setData(response.data)
         dispatch(fetchFirstData)
          dispatch(addData(response.data))  
        })
      }
    },[skip])

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
    await Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${limit}`).then((response)=>{
        console.log("response",response)
         dispatch(setSkip())
        dispatch(concatData(response.data))
     
    }).catch(response=>{
      console.log("response error",response)
      if (response.response.status ==300){
        console.log("300")
      
        dispatch(fetchMoreData())
      }
    })}
   }

    const RefreshData=async()=>{
      dispatch(RefreshAllData())
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
      refreshFunction={RefreshData}
     scrollThreshold={0.7}
      // scrollY={CurrentScroll}
     loader={ 
      <CardSkeleton></CardSkeleton>
    }
    //  <h4>loading...</h4>
     endMessage={
      <p style={{ textAlign: "center" }}>
        <b>Khatam!!!</b>
      </p>
    }
    
    pullDownToRefresh
    pullDownToRefreshThreshold={50}
    pullDownToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
    }
    releaseToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
    }


    >      
    { dataRedux.map((element,index)=>{
       let base64 = null;
       let img=null;
       if (element.image.data) {
         base64 = btoa(
           new Uint8Array(element.image.data.data).reduce(function (data, byte) {
             return data + String.fromCharCode(byte);
           }, '')
         );
        img=`data:image/png;base64,${base64}`;
       } else {
         console.log('no image');
       }

       

        const base641= btoa(new Uint8Array(element.creater.profile.avatar.data.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte);
      }, ''));
     
      const imgAvatar=`data:image/png;base64,${base641}`


       return (
        <>
        <div key={index} style={{display: 'flex',flexDirection: 'column',alignItems:"center"}}>
         <Cards key={index} index={index}  imgAvatar={imgAvatar} ondislike={ondislike} userId={a.id} likes={element.likes} id={element._id} name={element.creatername} date={element.date} image={img}  heading={element.heading} caption={element.caption} allowComments={element.allowComments} onlike={onlike} displayLike={lik} isMyPosts={false}></Cards>
        </div>
        </>
      )
       
    })}

</InfiniteScroll>
   :  <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "95vh", backgroundColor: "whitesmoke" }} spacing={2}>
   <> <CardSkeleton></CardSkeleton> <CardSkeleton></CardSkeleton><CardSkeleton></CardSkeleton></>
 </Paper>
   }
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
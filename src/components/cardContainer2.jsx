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
import InfiniteLoader from "react-window-infinite-loader";
import {VariableSizeList} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
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
    await Axios.get(`https://nice-plum-panda-tam.cyclic.app/batchData/${skip}/${limit}`).then((response)=>{
       

      
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

   // const isItemLoaded = (index) => index < dataRedux.length;
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
    } else {
      return 250; // Item without image
    }
  };
    const itemCount = more?dataRedux.length+1:dataRedux.length;
    console.log("itemCount",itemCount)
    const Item = ({ index, style }) => {
       const item= dataRedux[index];

        console.log("index",index)
        console.log("style",style)
        if (!item) {
          // If the item isn't loaded, display a loading placeholder
          return(
            <div style={style}>
            
            <Card elevation={3} sx={{ ml:"auto",mr:"auto", maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
          <CardHeader avatar={<Skeleton variant="circular" animation="wave" width={70} height={70}></Skeleton>} 
           title={<Skeleton  sx={{borderRadius:0}} animation="wave" ></Skeleton>} subheader={<Skeleton variant='rectangular' animation="wave"></Skeleton>} > 
           </CardHeader>
           <Skeleton variant="rectangular" animation="wave" sx={{ml:"10px",mr:"10px"}}></Skeleton>
          
            <Skeleton variant="rectangular" animation="wave" sx={{minHeight:"200px",minWidth:"250px",maxHeight:"300px",maxWidth:"100%",mt:2,position:"center",justifyContent:"center",objectFit:"scale-down"}}></Skeleton>
            </Card>
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
      <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={fetchMoreData1}
    >
      {({ onItemsRendered, ref }) => (
        <VariableSizeList
          className="List"
          height={800}
          itemCount={itemCount}
          itemSize={(index)=>getItemSize(index)}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={"100%"}
        >
          {Item}
        </VariableSizeList>
      
      )}
    </InfiniteLoader>
    
    
    
//     <InfiniteScroll
//      dataLength={dataRedux.length}
//      next={fetchMoreData1}
//      hasMore={more}
//      loader={ 
//       <div style={{ display: 'flex',justifyContent:"center" }}>
//       <Box sx={{ display: 'flex',justifyContent:"center" }}>
//       <h4 >Loading...</h4>
//     </Box>
//     </div>
//     }
//     //  <h4>loading...</h4>
//      endMessage={
//       <p style={{ textAlign: "center" }}>
//         <b>Khatam!!!</b>
//       </p>
//     }
//     >      
//     { dataRedux.map((element,index)=>{
//        let base64 = null;
//        let img=null;
//        if (element.image.data) {
//          base64 = btoa(
//            new Uint8Array(element.image.data.data).reduce(function (data, byte) {
//              return data + String.fromCharCode(byte);
//            }, '')
//          );
//         img=`data:image/png;base64,${base64}`;
//        } else {
//          console.log('no image');
//        }

       

//         const base641= btoa(new Uint8Array(element.creater.profile.avatar.data.data).reduce(function (data, byte) {
//           return data + String.fromCharCode(byte);
//       }, ''));
     
//       const imgAvatar=`data:image/png;base64,${base641}`


//        return (
//         <>
//         <div style={{display: 'flex',flexDirection: 'column',alignItems:"center"}}>
//          <Cards key={index} index={index}  imgAvatar={imgAvatar} ondislike={ondislike} userId={a.id} likes={element.likes} id={element._id} name={element.creatername} date={element.date} image={img}  heading={element.heading} caption={element.caption} onlike={onlike} displayLike={lik} isMyPosts={false}></Cards>
//         </div>
//         </>
//       )
       
//     })}

// </InfiniteScroll>
   : <div style={{display:"flex",alignSelf:"center",flexDirection:"column",alignItems:"center"}}> <Card elevation={3} sx={{  maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
    <CardHeader avatar={<Skeleton variant="circular" animation="wave" width={70} height={70}></Skeleton>} 
     title={<Skeleton  sx={{borderRadius:0}} animation="wave" ></Skeleton>} subheader={<Skeleton variant='rectangular' animation="wave"></Skeleton>} > 
     </CardHeader>
     <Skeleton variant="rectangular" animation="wave" sx={{ml:"10px",mr:"10px"}}></Skeleton>
    
      <Skeleton variant="rectangular" animation="wave" sx={{minHeight:"200px",minWidth:"250px",maxHeight:"300px",maxWidth:"100%",mt:2,position:"center",justifyContent:"center",objectFit:"scale-down"}}></Skeleton>

    
      
    {/* <Skeleton >
    </Skeleton> */}
    </Card>
    <Card elevation={3} sx={{  maxWidth:{xs:"95%",sm:"75%"}, minWidth:{xs:"95%",sm:"75%"},alignSelf:"center",mb:1,mt:2,borderRadius:"10px"}}>
    <CardHeader avatar={<Skeleton variant="circular" animation="wave" width={70} height={70}></Skeleton>} 
     title={<Skeleton  sx={{borderRadius:0}} animation="wave" ></Skeleton>} subheader={<Skeleton variant='rectangular' animation="wave"></Skeleton>} > 
     </CardHeader>
     <Skeleton variant="rectangular" animation="wave" sx={{ml:"10px",mr:"10px"}}></Skeleton>
    
      <Skeleton variant="rectangular" animation="wave" sx={{minHeight:"200px",minWidth:"250px",maxHeight:"300px",maxWidth:"100%",mt:2,position:"center",justifyContent:"center",objectFit:"scale-down"}}></Skeleton>

    
      
    {/* <Skeleton >
    </Skeleton> */}
    </Card> 
    </div>}
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
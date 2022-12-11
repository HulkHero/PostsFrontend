import React from 'react'
import {Paper,Button} from "@mui/material"
import { useState ,useEffect} from 'react'
import Cards from './Cards';
import Axios from "axios";
import axios from 'axios';
import { useContext } from 'react';
import NoteContext from '../context/noteContext';


const CardContainer = () => {
 // var data;
 const a= useContext(NoteContext)
 const [data,setData]=useState([])
 const [lik,setLik]=useState()
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
   
  
    useEffect(() => {
      const cancelToken=Axios.CancelToken.source()
       Axios.get("http://localhost:5000/",{cancelToken:cancelToken.token}).then((response) => {
        console.log("response:data", response)
         setData(response.data)
        }).catch((error) => {
            if(axios.isCancel(error)){
              console.log("error:cancel",error)
            }
        })

        return(()=>{
          cancelToken.cancel()

        }
        )

    },[ ])

    const onlike=(id)=>{
      if (a.id){
        Axios.put(`http://localhost:5000/likePost/${id}/${a.id}`).then((response) => {
         
          console.log("response:dislike", response)
          setLik(response.data.likes.length);
          console.log(lik)
      
        })

      }
      else{ console.log("login first")}
     

    }
    const ondislike=(id)=>{
      
      Axios.put(`http://localhost:5000/dislikePost/${id}/${a.id}`).then((response) => {
        setLik(response.data.likes.length);
           
        // setData(data.map((val)=>{
         
        //   if (val.likes.length>=0 && data.length>0)
        //   {
        //   return(
        //     val._id==id && val.likes?  val.likes=val.likes.filter(item=>item !==  a.id): val
        //   )}
        // }))
        
     
      })

   }
   console.log("rendering")

  return (
    <>
   
    <Paper evaluation={2} style={{minWidth: "100%",display:"flex:",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100%",backgroundColor:"#cde8cc"}} spacing={1}>
          
    {data && data.map((element)=>{
           const base64= btoa(new Uint8Array(element.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
       
        const img=`data:image/png;base64,${base64}`
       return (
        <>
        <div style={{display: 'flex',flexDirection: 'column',alignItems:"center"}}>
         <Cards key={element._id} ondislike={ondislike} userId={a.id} likes={element.likes} id={element._id} name={element.creatername} date={element.date} image={img}  heading={element.heading} caption={element.caption} onlike={onlike} displayLike={lik} isMyPosts={false}></Cards>
        </div>
        </>
      )
       
    })}


    </Paper>
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
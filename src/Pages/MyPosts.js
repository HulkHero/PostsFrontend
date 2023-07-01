import React from 'react'

import { Paper, } from "@mui/material"
import { useState, useEffect, useContext } from 'react'
import Cards from '../components/Cards';
import Axios from "axios";
import NoteContext from '../context/noteContext'
import CardSkeleton from '../components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { useMyPostsRK } from '../reactKueries/MyPostsRK';
import { useLikePostRK, useDisLikePostRK } from '../reactKueries/MyPostsRK';
const MyPosts = () => {
  const a = useContext(NoteContext)
  const [lik, setLik] = useState()
  if (a.token) { }
  else {
    const getToken = sessionStorage.getItem("token");

    const getid = sessionStorage.getItem("id");
    const getcreatername = sessionStorage.getItem("creatername");
    if (getToken !== null) {
      a.setToken(getToken)
      a.setId(getid)
      a.setcreatername(getcreatername)
    }
  }
  const { isLoading, error, data, isError } = useMyPostsRK(a.id, a.token)
  const { mutate: likePost } = useLikePostRK(a.id)
  const { mutate: dislikePost } = useDisLikePostRK(a.id)

  if (isLoading) {

    return (
      <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "95vh", backgroundColor: "whitesmoke" }} spacing={2}>
        <> <CardSkeleton></CardSkeleton> <CardSkeleton></CardSkeleton></>
      </Paper>
    )
  }
  if (isError) {
    return (
      <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "95vh", backgroundColor: "whitesmoke" }} spacing={2}>
        <h4 style={{ marginTop: 0, paddingTop: 4, textAlign: "center" }}>{error.messege}</h4>
      </Paper>
    )

  }
  if (data.length == 0) {
    return (
      <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "95vh", backgroundColor: "whitesmoke" }} spacing={2}>
        <h4 style={{ marginTop: 0, paddingTop: 4, textAlign: "center" }}>You have not posted anything yet</h4>
      </Paper>
    )
  }

  const onDelete = (id) => {

    console.log("delete my posts", id)
    Axios.delete(`https://nice-plum-panda-tam.cyclic.app/deletePost/${id}/${a.id}`, {
      headers: {
        Authorization: a.token
      }
    }).then((response) => {
      alert("post deleted")
    }

    )
  }
  const ondislike = (id) => {
    dislikePost({ storyId: id, userId: a.id })
  }


  const onlike = (id) => {
    if (a.id) {
      likePost({ storyId: id, userId: a.id })
    }
  }



  return (
    <>

      <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "95vh", backgroundColor: "whitesmoke" }} spacing={2}>

        {data?.length > 0 ? data.map((element) => {
          let base64 = null;
          let img = null;
          if (element.image.data) {
            base64 = btoa(
              new Uint8Array(element.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, '')
            );
            img = `data:image/png;base64,${base64}`;
          } else {
            console.log('no image');
          }
          return (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Cards key={element._id} id={element._id} ondislike={ondislike} userId={a.id} likes={element.likes} name={element.creatername} date={element.date} image={img} heading={element.heading} allowComments={element.allowComments} caption={element.caption} onlike={onlike} displayLike={lik} onDelete={onDelete} isMyPosts={true} ></Cards>
              </div>
            </>
          )

        })
          : <> <CardSkeleton></CardSkeleton> <CardSkeleton></CardSkeleton></>
        }


      </Paper>
    </>
  )
}

export default MyPosts;
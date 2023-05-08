import React from 'react'

import { Paper, Button, Typography } from "@mui/material"
import { useState, useEffect, useContext } from 'react'
import Cards from '../components/Cards';
import Axios from "axios";
import NoteContext from '../context/noteContext'

const MyPosts = () => {
  const a = useContext(NoteContext)
  const [lik, setLik] = useState()
  const [text, setText] = useState("Loading...")
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

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("id in my posts", a.id)
    const id = a.id
    Axios.get(`https://nice-plum-panda-tam.cyclic.app/myPosts/${id}`, {
      headers: {
        'Authorization': a.token
      }
    }).then((response) => {
      if (response.status == 400) {
        alert("you are not authorized")
        setText("You have not posted anything")
      }
      else {
        setData(response.data);
        console.log("return my posts", response.data)

      }




    }).catch(response => {
      setText("you have not posted anything")
    })

  }, [a.id])

  const onDelete = (id) => {

    console.log("delete my posts", id)
    Axios.delete(`https://nice-plum-panda-tam.cyclic.app/deletePost/${id}/${a.id}`).then((response) => {
      alert("post deleted")

      setData(data.filter((val) => {
        return val._id != id;
      }))
    }

    )
  }
  const ondislike = (id) => {

    Axios.put(`https://nice-plum-panda-tam.cyclic.app/dislikePost/${id}/${a.id}`).then((response) => {
      setLik(response.data.likes.length);
    })

  }
  const onlike = (id) => {
    if (a.id) {
      Axios.put(`https://nice-plum-panda-tam.cyclic.app/likePost/${id}/${a.id}`).then((response) => {

        console.log("response:dislike", response)
        setLik(response.data.likes.length);
        console.log(lik)

      })

    }
    else { console.log("login first") }


  }


  return (
    <>

      <Paper evaluation={2} style={{ minWidth: "100%", display: "flex:", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", backgroundColor: "whitesmoke" }} spacing={2}>

        {data.length > 0 ? data.map((element) => {
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
                <Cards key={element._id} id={element._id} ondislike={ondislike} userId={a.id} likes={element.likes} name={element.creatername} date={element.date} image={img} heading={element.heading} caption={element.caption} onlike={onlike} displayLike={lik} onDelete={onDelete} isMyPosts={true} ></Cards>
              </div>
            </>
          )

        })
          : <Typography sx={{ ml: "auto", mr: "auto" }}>{text} </Typography>
        }


      </Paper>
    </>
  )
}

export default MyPosts;
import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const[token,setToken]=useState("");

  const[id, setId]=useState();
  const[creatername,setcreatername]=useState("")


  console.log("inside context")


    return(
        <NoteContext.Provider value={{token,setToken,id,setId,creatername,setcreatername}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
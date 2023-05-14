import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const [token, setToken] = useState("");

    const [id, setId] = useState();
    const [creatername, setcreatername] = useState("")
    const [loginText, setLoginText] = useState("login")

    

    console.log("inside context")

    const logout = () => {

        // const getStorageData = async () => {
        //     const token = await sessionStorage.getItem("token");
        //     a.setToken(token)
        //     const id = await sessionStorage.getItem("id");
        //     a.setId(id)
        //     const name = await sessionStorage.getItem("creatername");
        //     a.setcreatername(name)
        //     console.log("getting Data from storage")
        //   }
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("creatername");

        setToken("")
        setId("")
        setcreatername("")
        setLoginText("login")
    }


    return (
        <NoteContext.Provider value={{ token, setToken, id, setId, creatername, setcreatername, loginText, setLoginText, logout }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
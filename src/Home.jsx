import React, { useState } from "react";
import { Link } from "react-router-dom";

import AllChats from "./Components/Chats/AllChats.jsx";
import UserList from "./Components/Chats/UserList.jsx";



function LeftPortion() {

  const [show,setShow]=useState("chats")
  const [isgrp,setisgrp]=useState(false)
  const setchats=()=>{
    setShow("chats")
  }
  const setUsers=()=>{
    setShow("users")
  }
  const setgrp=()=>{
    setisgrp(true)
  }
  return (
   
      <div className="leftportion flex  flex-col">
      <div className="flex p-1 rounded border border-black header justify-around">
        <div  className={`headerelem ${show==="chats"?"selected":""}`} onClick={setchats} >Your Chats</div>
        <div className={`headerelem ${show==="users"?"selected":""}`} onClick={setUsers} >All users</div>
       <Link to={'/creategrp'}>
       <div onClick={setgrp} className={`headerelem ${isgrp?"selected":""} border-black`}>Create Group</div>
       </Link> 
      </div>
      {show==="chats"?(<AllChats/>):(<UserList isgrp={false}/>)}
    </div>
      
   
  )
}

export default LeftPortion;

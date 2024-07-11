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
  return (
    <div>
      <div>
      <div className="flex  justify-between">
        <span onClick={setchats} >Your Chats</span>
        <span onClick={setUsers} >All users</span>
       <Link to={'/creategrp'}>
       <span >Create Group</span>
       </Link> 
      </div>
      {show==="chats"?(<AllChats/>):(<UserList isgrp={false}/>)}
    </div>
      
    </div>
  )
}

export default LeftPortion;

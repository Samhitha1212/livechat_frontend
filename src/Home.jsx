import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AllChats from "./Components/Chats/AllChats.jsx";
import UserList from "./Components/Chats/UserList.jsx";
import NewChat from "./Components/Chats/NewChat.jsx";
import Chat from "./Components/Chats/Chat.jsx";
function Home() {
  const [show,setShow]=useState("chats")
  const setchats=()=>{
    setShow("chats")
  }
  const setUsers=()=>{
    setShow("users")
  }
  return (
    <div>
      
      <Routes>
      <Route
          path="/"
          element={
            <div className="flex ">
              <div>
      <div className="flex ">
        <span onClick={setchats} >Your Chats</span>
        <span onClick={setUsers} >All users</span>
      </div>

      {
        show==="chats"?(<>
        <AllChats/>
        </>):(<>
        <UserList/>
        </>)
      }
    </div>
              <UserList />
            </div>
          }
        />
      <Route
          path={`/newchat/:userid`}
          element={
            <div className="flex ">
              <div>
      <div className="flex ">
        <span onClick={setchats} >Your Chats</span>
        <span onClick={setUsers} >All users</span>
      </div>

      {
        show==="chats"?(<>
        <AllChats/>
        </>):(<>
        <UserList/>
        </>)
      }
    </div>
              <NewChat />
            </div>
          }
        />
        <Route
          path={`/chat/:chatid`}
          element={
            <div className="flex ">
              <div>
      <div className="flex ">
        <span onClick={setchats} >Your Chats</span>
        <span onClick={setUsers} >All users</span>
      </div>

      {
        show==="chats"?(<>
        <AllChats/>
        </>):(<>
        <UserList/>
        </>)
      }
    </div>
              <Chat />
            </div>
          }
        />
       
      </Routes>
    </div>
  );
}

export default Home;

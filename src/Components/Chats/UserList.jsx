import React, { useLayoutEffect, useState, useEffect } from "react";
import "./UserList.css";
import axios from "axios";
import {useSelector} from 'react-redux'
import { selectUser } from '../../Features/Userslice.js'
import { useNavigate } from "react-router-dom";


function UserList() {
  const [usersList, setusersList] = useState([]);
  const [displaydata, setdisplaydata] = useState([]);
  const [searchtext, setsearchtext] = useState("");

  const currentUser=useSelector(selectUser)
  const navigate=useNavigate()
  useLayoutEffect(() => {
    const renderData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user");
        setusersList( res.data.sort((a,b)=>{
          if(a.username.toLowerCase()<b.username.toLowerCase())
            return -1
          else if(a.username.toLowerCase()>b.username.toLowerCase())
            return 1
          else 
          return 0
        }))
        setdisplaydata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    renderData();
  }, []);

  useEffect(()=>{
    const filterData = () => {
      if (searchtext !== "") {
        const filteredData = usersList.filter((user) => 
  
        (user.username.toLowerCase().includes(searchtext.toLowerCase()) ||
        user.email.includes(searchtext.toLowerCase()))
        );
        setdisplaydata(filteredData);
      } else {
      
        setdisplaydata(usersList);
      }
    };
    filterData()

  },[searchtext])

  const enterChat=async(user)=>{

    const res= await axios.get(`http://localhost:5001/api/chat/${currentUser._id}`)
    const chats=res.data

    const chat =chats.filter((chat)=>{
     
      return (chat.members.includes(user._id) && chat.chatType === "one-to-one")
    })
    console.log(chats,chat)
    if(!chat.length){
      navigate(`/newchat/${user._id}`)
    }else{
      navigate(`/chat/${chat[0]._id}`)
    }

  }

  return (
    <div className="userList p-4 m-4">
      <div className=" searchcontainer flex p-1 rounded-md border justify-start  border-black shadow-sm shadow-current">
      <i class="bi bi-search"></i>
        <input
        className="p-1"
          type="text"
          value={searchtext}
          placeholder="Search user ...."
          onChange={(e) => {
            setsearchtext(e.target.value)
          }}
          id="search-text"
        
        />
      </div>
      {displaydata?.length > 0 ? (
        <div className="mt-4 border-2 rounded-md shadow shadow-current border-black p-4 usercontainer">
          {displaydata.map((user) => (
            <div className="mt-4">
              <div className="userbox border shadow shadow-current p-1 flex justify-between m-4" onClick={()=>{enterChat(user)}}>
                <span>{user.username}</span>
                <span>{user.email}</span>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2>No user</h2>
        </>
      )}
    </div>
  );
}

export default UserList;

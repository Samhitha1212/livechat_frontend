import React, { useLayoutEffect, useState, useEffect } from "react";
import "./UserList.css";
import axios from "axios";
import {useSelector} from 'react-redux'
import { selectUser } from '../../Features/Userslice.js'
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext.jsx";


function UserList({isgrp}) {
  const [usersList, setusersList] = useState([]);
  const {onlineUsers}=useSocketContext()
  const [displaydata, setdisplaydata] = useState([]);
  const [searchtext, setsearchtext] = useState("");


  const [isgrpCreating,setgrpCreating]=useState(isgrp)
  const [grpmembers,setgrpmembers]=useState([])
  const [grpname,setgrpname]=useState("")

  const currentUser=useSelector(selectUser)
  const navigate=useNavigate()


  const handleCheckboxChange=(isuserselected,user)=>{
    if(isuserselected){
      setgrpmembers([...grpmembers,user])
    }else{
      setgrpmembers(
        grpmembers.filter(mem=>{
        return (mem._id != user._id)
      }))
    }
    
  }

  const creategroup=async()=>{
    let members=[]
    grpmembers.forEach(mem=>{
      members.push(mem._id)
    })
    const newgrp={
      members,
      chatType:"group",
      grpname
    }

    const res= await axios.post('http://localhost:5001/api/chat/',{chat:newgrp}).then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e)
    })
    
  }
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
      {
        isgrpCreating?(<>
        <input  
        type="text"
         placeholder="Enter group name"
         className="border border-black rounded shadow shadow-current p-3"
         onChange={e=>setgrpname(e.target.value)}
         />
        <button className="border border-black rounded shadow shadow-current m-2  p-3  " onClick={creategroup}>Create Group</button>
        
        </>):(<></>)
      }
      {displaydata?.length > 0 ? (
        <div className="mt-4 border-2 rounded-md shadow shadow-current border-black p-4 usercontainer">
          {displaydata.map((user) => (
            <div className="mt-4">
              <div className="userbox border shadow shadow-current p-1 flex justify-between m-4" onClick={()=>{isgrpCreating?null:enterChat(user)}}>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{onlineUsers.includes(user._id)?"online":"Offline"}</span>
                {
                  isgrpCreating?(<>
                    <input 
              type="checkbox"
              onChange={(e)=>{handleCheckboxChange(e.target.checked,user)}}
              
              
              
              />
                  </>):(<></>)
                }
              
              </div>

           
              
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2>No user</h2>
        </>
      )}

      {
        (isgrpCreating && grpmembers.length>0)?(<>
        <div>
          Group Members:
          {
            grpmembers.map(mem=>(
              <>
              <span>{mem.username}, </span>
              </>
            ))
          }
        </div>
        
        
        </>):(<></>)
      }
    </div>
  );
}

export default UserList;

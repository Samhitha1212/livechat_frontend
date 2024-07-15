import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "./Chat.css";
import ScrollToBottom from 'react-scroll-to-bottom'
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../Features/Userslice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext";

function Chat() {
  const {onlineUsers,socket}=useSocketContext()
  const [newmessage, setnewmessage] = useState("");
  const {chatid}  = useParams();
  const currentUser = useSelector(selectUser);
  const [chat, setchat] = useState();
  const [messages, setmessages] = useState([]);
  const [members, setmembers] = useState([]);
  const [displayuser, setdisplayuser] = useState("");
  const[ names,setnames] = useState({});
  const messageref=useRef(null)


  useEffect(()=>{

    socket?.on("newMessage",(newMessagedetails)=>{
      const {newmessage,newmessagechat}=newMessagedetails
      if(newmessagechat._id == chatid){
        setmessages([...messages,newmessage])
       
      }
    })
    return ()=> socket?.off("newMessage")

  },[socket,messages])

  const sendMessage=async()=>{
    if(newmessage !== ""){
      const message={
        author:currentUser._id,
        content:newmessage
      }
      try{
        const res=await axios.post(`http://localhost:5001/api/message/${chatid}`,message)
        // setmessages([...messages,res.data])
      messageref.current.value=""
      }catch(e){
        console.log(e)
      }
    }
  }

  const convertToTime=(createdAt)=>{
    const date =new Date(createdAt)
    const hours=date.getHours()
    const minutes=date.getMinutes()
    const time=`${hours}:${minutes}`
    return time
  }

  useLayoutEffect(() => {
    const renderData = async () => {
      try {
      const chatres = await axios.get(`http://localhost:5001/api/chat/?chatid=${chatid}`)
      setchat(chatres.data);
      const memres = await axios.get(`http://localhost:5001/api/user/?grpid=${chatid}`)
      setmembers(memres.data);
      const mesres = await axios.get(
      `http://localhost:5001/api/message/${chatid}`)
      setmessages(mesres.data);
      } catch (err) {
        console.log(err);
      }
    };
    renderData();
    
  }, [chatid]);

  useEffect(()=>{
    const updatednames={}
    members.length>0?(
      members.forEach((member) => {
          updatednames[member._id]={"username":member.username,"photo":member.photo}
    })):(null);
    setnames(updatednames)
  },[members,chatid])

  useEffect(()=>{
    let id;
   
    if(chat && members ) {
      if (chat.chatType === "one-to-one") {
        if (chat.members[0] === currentUser._id) {
          id = chat.members[1];
        } else {
          id = chat.members[0];
        }
        setdisplayuser({
          _id:id,
          displayname:names[id]?.username,
          photo:names[id]?.photo
          
        })
      } else {
        setdisplayuser({displayname:chat.grpname});
      }

    }
  },[members,chatid,names])

  return (
    <div className="chat p-4 flex flex-col">
      {
        displayuser?(<>
        <div className=' flex chattitle border border-black rounded shadow-md   shadow-current p-1  mb-2 justify-between'>
          <div className="flex">
         
            <span className=''><img className='propic' src={`${displayuser.photo?displayuser.photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKYamkRB_qMHdd_HvhrxBlHhExgcAW6Mquw&s'}`} /></span>
          
        <span className="text-stone-950"> {displayuser.displayname}</span>
          </div>

        {
          chat.chatType === "one-to-one"?(<>
          <span className="text-sm ">{onlineUsers.includes(displayuser._id)?"online":"Offline"}</span>
          </>):(<></>)
        }
        
        </div>
        </>):(<></>)
      }
      
     
      {messages.length>0 ? (
        <div className="flex flex-col msgcontainer border border-black rounded shadow-md   shadow-current p-1  ">
          <ScrollToBottom className="msgcontainer">
          {messages?.map((message) => (
            <div className={`flex ${message.author===currentUser._id?'right':'left'} m-2`}>
              <div className={` msg rounded-md p-1 border shadow shadow-current border-black flex flex-col `}>
               <div className=" msgauther flex ">{names[message?.author].username}</div>
                <div className="msgcontent flex">{message.content}</div>
                <div className="msgtime flex justify-end">{convertToTime(message.createdAt)}</div>
              </div>
            </div>
          ))}
          </ScrollToBottom>
        </div>
      ) : (
        <>
        <h1>No messages</h1>
        </>
      )}
      <div className="flex inputcontainer mt-3">
      <input 
      className='msginput rounded border border-black'
      type='text'
      ref={messageref}
       name='newmessage'
       onChange={e=>setnewmessage(e.target.value)}
       placeholder='Type your Message'
         />
         <button className='sendbtn border ml-2 border-black rounded bg-white' onClick={sendMessage}>Send</button>

      </div>
    
    </div>
  );
}

export default Chat;

import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "./Chat.css";

import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../Features/Userslice";
import { useSelector } from "react-redux";
import axios from "axios";

function Chat() {
  const [track,settrack]=useState(false)
  const [newmessage, setnewmessage] = useState("");
  const {chatid}  = useParams();
  const currentUser = useSelector(selectUser);
  const [chat, setchat] = useState();
  const [messages, setmessages] = useState([]);
  const [members, setmembers] = useState([]);
  const [displayname, setdisplayname] = useState("");
  const[ names,setnames] = useState({});
  const messageref=useRef(null)
  const sendMessage=async()=>{
    if(newmessage !== ""){
      const message={
        author:currentUser._id,
        content:newmessage
      }
      try{
        const res=await axios.post(`http://localhost:5001/api/message/${chatid}`,message)
      messageref.current.value=""
      settrack(!track)
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
    
  }, [track,chatid]);

  useEffect(()=>{
    const updatednames={}
    members.length>0?(
      members.forEach((member) => {
          updatednames[member._id]=member.username
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
        setdisplayname(names[id])
      } else {
        setdisplayname(chat.grpname);
      }

    }
  },[members,chatid,names])

  return (
    <div className="chat">
      {
        displayname?(<>
        <div className=' flex border border-black rounded shadow-md   shadow-current p-1  mb-2'>
        <span> {displayname}</span>
        </div>
        </>):(<></>)
      }
      
     
      {messages ? (
        <div className="flex flex-col msgcontainer border border-black rounded shadow-md   shadow-current p-1  ">
          {messages?.map((message) => (
            <div className={`flex ${message.author===currentUser._id?'right':'left'} m-2`}>
              <div className={` msg rounded-md p-1 border shadow shadow-current border-black flex flex-col `}>
               <div className=" msgauther flex ">{names[message.author]}</div>
                <div className="msgcontent flex">{message.content}</div>
                <div className="msgtime flex justify-end">{convertToTime(message.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
        <h1>No messages</h1>
        </>
      )}
      <div className="flex">
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

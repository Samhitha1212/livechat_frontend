import React, { useState ,useLayoutEffect,useEffect} from 'react'
import './NewChat.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { selectUser } from '../../Features/Userslice'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useSocketContext } from '../../context/SocketContext'

function NewChat() {
  const {onlineUsers}=useSocketContext()
  const [newmessage,setnewmessage]=useState("")
  const {userid}=useParams()
  const currentUser=useSelector(selectUser)
  const [chatmember,setchatmember]=useState()
  const navigate=useNavigate()
  useEffect(() => {
    const renderData = async () => {
      try {
        const res = await axios.get(`https://livechat-backend-j9re.onrender.com/api/user/${userid}`);
        setchatmember(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    renderData();
  }, [userid]);

  const createChatAndSendMsg=async()=>{
    console.log(newmessage)
    const message={
      author:currentUser._id,
      content:newmessage
    }

    const chat={
      chatType:"one-to-one",
      members:[currentUser._id,userid]

    }

    const res=await axios.post('https://livechat-backend-j9re.onrender.com/api/chat',{
      chat,
      message
    })
    const newchat=res.data
    
    navigate(`/chat/${newchat._id}`,{ replace: true })
   
  }

  return (
    <div className='newchat bg-slate-500 p-2'>
      <div className='memberdetail flex border shadow-md shadow-current p-1  justify-between mb-2'>
      <span>{chatmember?.username}</span>
      <span>{chatmember?.email}</span>
      <span>{onlineUsers.includes(chatmember?._id)?"online":"Offline"}</span>

      </div>
      <div className='border-2 border-black msgblock flex '>
        Send Message To  start chat 
      </div>
     <div className=' flex mt-3'>
      <input 
      className='msginput rounded border border-black'
      type='text'
       name='newmessage'
       onChange={e=>setnewmessage(e.target.value)}
       placeholder='Type your Message'
         />
         <button className='sendbtn border ml-2 border-black rounded bg-white' onClick={createChatAndSendMsg}>Send</button>
     </div>
    </div>
  )
}

export default NewChat

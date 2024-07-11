import React, { useEffect, useState } from 'react'
import './Allchats.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/Userslice'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketContext'

function AllChats() {
  const {onlineUsers,socket}=useSocketContext()
  const [chats,setchats]=useState([])
  const currentUser=useSelector(selectUser)
  const [displaychats,setdisplaychats]=useState([])

  const convertToTime=(createdAt)=>{
    const date =new Date(createdAt)
    const hours=date.getHours()
    const minutes=date.getMinutes()
    const time=`${hours}:${minutes}`
    return time
  }


  useEffect(()=>{

    socket?.on("newMessage",(newMessagedetails)=>{
      const {newmessage,newmessagechat}=newMessagedetails
      setchats(chats => 
        chats.map(chat => 
          chat._id == newmessagechat._id ? { ...chat, lastMessage: newmessage } : chat
        )
      );
      setdisplaychats(displaychats => 
        displaychats.map(chat => 
          chat.chatid == newmessagechat._id ? { ...chat, lastMessage: newmessage } : chat
        )
      );

      return ()=> socket?.off("newMessage")
    })

    socket?.on("newChat",(newMessagedetails)=>{
      const {newmessagechat}=newMessagedetails
      // if(newmessagechat.chatType==="one-to-one"){
      //   const {newmessage}=newMessagedetails
      //   setchats([...chats,newmessagechat])
      // }
      setchats([...chats,newmessagechat])
      return ()=> socket?.off("newMessage")
    })
  

  },[socket,chats])
  useEffect(()=>{
    const fetchChatData=async()=>{
      try{
        const res= await axios.get(`http://localhost:5001/api/chat/full/${currentUser._id}`)
        setchats(res.data)

      }catch(e){
        console.log(e)
      }
    }
    fetchChatData()

  },[])

  useEffect(()=>{
    const chatsData=[]

    chats.forEach(chat=>{
      let chatName;
      let id
      if(chat.chatType==="group"){
        chatName=chat.grpname

      }else{
        chat.members.forEach(member=>{
          if(member._id !== currentUser._id){
            chatName=member.username
            id=member._id
          }
        })
      }

      chatsData.push({
        id,
        chatid:chat._id,
        chatName,
        lastMessage:chat.lastMessage,
        chatType:chat.chatType
      })

    })
    setdisplaychats(chatsData)

  },[chats])


  return (
    <div className='allchats border-2 border-black rounded-md shadow-current shadow-inner p-8'>
      All charts
      <div className='chatscontainer'>
        {
          displaychats.length>0?(
          <>
          {
            displaychats.map(data=>(
              <>
              <Link to={`/chat/${data.chatid}`}>
              <div className='flex flex-col border border-black shadow  m-1 p-2 ' >
               <strong className='flex justify-between'>
                <span className='text-black'>{data.chatName}</span>
                {
                  data.chatType==="one-to-one"?(<>
                   <span className='text-sm'>{onlineUsers.includes(data.id)?"online":"Offline"}</span>
                  </>):(<></>)
                }
               
               </strong> 
                <span className='text-sm flex justify-between'>
                 <span>{data.lastMessage?.content}</span>
                 <span>{convertToTime(data.lastMessage?.createdAt)}</span> 
                </span>
              </div>
              </Link>
              </>
            ))
          }
          
          </>):(<></>)
        }

      </div>
    </div>
  )
}

export default AllChats

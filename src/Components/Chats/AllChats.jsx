import React, { useEffect, useState } from 'react'
import './Allchats.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/Userslice'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AllChats() {
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
      if(chat.chatType==="group"){
        chatName=chat.grpname
      }else{
        chat.members.forEach(member=>{
          if(member._id !== currentUser._id){
            chatName=member.username
          }
        })
      }

      chatsData.push({
        id:chat._id,
        chatName,
        lastMessage:chat.lastMessage
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
              <Link to={`/chat/${data.id}`}>
              <div className='flex flex-col border border-black shadow  m-1 p-2 ' >
               <strong><span className='text-black'>{data.chatName}</span></strong> 
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

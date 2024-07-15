import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import clubLogo from '../../assets/club-logo.png'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/Userslice'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'

function Sidebar() {
  const navigate=useNavigate()
  const user=useSelector(selectUser)
  const [showsidebar,setsidebar]=useState(false)
  const  changesidebar=()=>{
    if(showsidebar){
      setsidebar(false)
    }
    else{
      setsidebar(true)
    }
  }

  const logout=()=>{
    signOut(auth);
    navigate('/')

  }
  return (
    <div className='flex flex-col' id='sidebar'>
      <div className='flex sidehead'>
      <Link to={'/'}>
         <div className='club-details flex'>
         <li><i class="bi bi-chat-dots-fill "></i></li>
          <li><span className='club-name text-3xl text-black'>ChatApp</span></li>
        </div>
        </Link>
        <span  className='menu' onClick={changesidebar}><i  class="bi bi-list"></i></span>
        </div>
        <div className={`Sauth flex flex-col ${showsidebar?"show":"hide"}`}>
       {
            !user?(<>
             
            <Link to={'/login'}> <li >LogIn</li></Link>
            <Link to={'/signup'}><li >SingUp</li></Link>
           
            </>):(
              <>
            <li onClick={logout} >LogOut</li> 
          <Link to={'/profile'}><li>Profile</li></Link>

          <li>
                <span className=''><img className='propic' src={`${user.photo}`} alt='profilepic'/></span>
                </li>
                <li>
                <span className='club-name text-3xl text-black'>{user.username}</span>
                </li>
            </>)
          }
      </div>
    </div>
  )
}

export default Sidebar

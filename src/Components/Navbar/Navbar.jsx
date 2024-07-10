import React, {  useState } from 'react'
import clubLogo from '../../assets/club-logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { selectUser } from '../../Features/Userslice.js';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase.jsx';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate()
  const user=useSelector(selectUser)

  const logout=()=>{
    signOut(auth);
    navigate('/')

  }


  return (
    <div className='flex flex-col'>
      <nav className='nav flex' id='nav'>
        <Link to={'/'}>
        <div className='club-details navdetails flex'>
          <li><i class="bi bi-chat-dots-fill "></i></li>
          <li><span className='club-name text-3xl text-black'>ChatApp</span></li>
          
        </div>
        </Link>
        <ul className='auth flex  text-black text-base decoration-white'>
        <div className='links flex'>
          {
            !user?(<>
             
            <Link to={'/login'}> <li className='links'>LogIn</li></Link>
            <Link to={'/signup'}><li className='links'>SingUp</li></Link>
           
            </>):(
              <>
              <li><span className='club-name text-3xl text-black'>{user.username}</span></li>
            <li className='links' onClick={logout}>LogOut</li>
         <Link to={'/profile'}><li className= 'links'>Profile</li></Link> 
       
            </>)
          }
           </div>
          
         
          
        </ul>
        
   
      </nav>
    
       <Sidebar/>
     
     
    </div>
  )
}

export default Navbar

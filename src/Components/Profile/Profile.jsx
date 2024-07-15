import React from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/Userslice'
import { Link } from 'react-router-dom'

function Profile() {
  const user=useSelector(selectUser)
  return (
<div className='flex  flex-col profile'>
    <div className='flex mt-8 profile-page flex-col align-middle justify-center bg-slate-200 p-8'>
      <div  className='flex  flex-col align-middle justify-center p-4 border shadow-md'>

      <div className='flex justify-between'>
        <span className=''><img className='propic' src={`${user?.photo}`} alt='profilepic'/></span>
        </div>
        <div className='flex justify-between'>
          <div >UserName:</div>
        <div className='flex justify-start'>{user?.username}</div>
        </div>
        <div className='flex justify-between'>
          <div >Email:</div>
        <div className='flex justify-start'>{user?.email}</div>
        </div>
      
       
        
        
      </div>

      <Link to={'/updateprofile'} >
      <button className='mt-8 bg-black text-white'>Update Profile</button>
      </Link>
      
    </div>
    </div>
  )
}

export default Profile

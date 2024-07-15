import React, { useState } from 'react'
import { auth } from '../firebase/firebase'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/Userslice'
function UpdateProfile() {

  const user=useSelector(selectUser)

  const [username,setUsername]=useState("")
  const [photo,setphoto]=useState("")
  const updateprofile=async()=>{
   
    let profile={   }
    if(username){
      profile.username=username;
    }
    if(photo){
      profile.photo=photo
    }
   const res= await axios.put(`https://livechat-backend-j9re.onrender.com/api/user/${user._id}`,profile).then(res=>{
    console.log(res,profile)
   }).catch(err=>{
    console.log(err)
   })
    
  }
  return (
    <div>
      <div className="form flex flex-col ">
    <div className="title m-4">Update Profile</div>
    <div className=' flex flex-col form-section '>
      
      <div class="inputs flex flex-col border border-inherit">
    <label className='form-label'>UserName</label>
    <input className='form-input' 
    onChange={e=>setUsername(e.target.value)} id='display-name' type="text" placeholder="" />
    <label className='form-label'>Photo url</label>
    <input className='form-input' id='photo-url'  type="file" placeholder="" onChange={e=>setphoto(e.target.value)}/>
    <button  id='add-bt' type="submit" className='mt-4 form-button' onClick={updateprofile}>Update</button>
  </div>
    </div>
    </div>
      
    </div>
  )
}

export default UpdateProfile

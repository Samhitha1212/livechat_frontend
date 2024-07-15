import React from 'react'
import './Signup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Signup() {
  const navigate=useNavigate()
  const [email,setEmail]=useState()
const [password,setPassword]=useState()
const [username,setUsername]=useState()

  const signUp=()=>{
    
    createUserWithEmailAndPassword(auth,email,password).then((cred)=>{
      console.log("signed up")
      // console.log(cred.user)
      console.log(cred.user.uid,cred)
       axios.post('https://livechat-backend-j9re.onrender.com/api/user',{
        email:email,
        username:username,
        fid:cred.user.uid,
      }).then(res=>{
        console.log("new user created created")
      }).catch(err=>{
        console.log(err.message)
      })
      navigate('/')
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="py-6">


<div className=" signUp flex  justify-center    mt-12 overflow-hidden mx-auto max-w-sm lg:max-w-2xl rounded-2xl">
<div className="w-full p-8 lg:w-1/2 ">

<div class="mt-4">
<label class="block text-gray-700 text-sm font-bold mb-2">Email </label>
<input class=" text-gray-700 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none"  name='email' type="email" onChange={e=>setEmail(e.target.value)} id='email-signup' placeholder='john@example.com'/>
</div>
<div class="mt-4">
<label class="block text-gray-700 text-sm font-bold mb-2">Username </label>
<input class=" text-gray-700 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none" name='username' type="text" onChange={e=>setUsername(e.target.value)} placeholder='john'/>
</div>
<div class="mt-4">
<div class="flex justify-between">
 <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>

</div>
<input class=" text-gray-700 focus:outline-none focus:shadow-outline border rounded py-2 px-4 block w-full appearance-none"  onChange={e=>setPassword(e.target.value)} placeholder='Must be atleast 6 characters'  name='password' type="password" id='password-signup'/>
</div>
<div className="mt-8">
<button className='btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 ' onClick={signUp}>SignUp</button>
</div>


</div>
</div>

</div>


    </>
  )
}

export default Signup

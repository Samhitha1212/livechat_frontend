import React, { useState } from 'react'

function Upload() {
  const [image,setImage]=useState({file:""})

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("uploaded")

  }  
  const handlefileUpload= async(file)=>{
    const base64=await convertTo64bit(file)
    console.log(base64)
    setImage({...image,file:base64})

  }
  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <label htmlFor='img-upload'><img src={image.file}/></label>
        <input type='file' id='image' onChange={(e)=>{handlefileUpload(e.target.files[0])}}/>
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default Upload

const convertTo64bit=(file)=>{

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })

 

}


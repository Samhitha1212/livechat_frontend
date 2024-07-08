import { configureStore } from "@reduxjs/toolkit"

import UserReducer from '../Features/Userslice.js'

export  const store=configureStore({
  reducer:{
    user:UserReducer,
  }
})


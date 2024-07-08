import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
  name:"user",
  initialState:{
    user:JSON.parse(localStorage.getItem("user")),
  },
  reducers:{
    login:(state,action)=>{
      state.user=action.payload;
    },
    logout:(state,action)=>{
      state.user=null;
    }
  }
})

export const {login,logout}=UserSlice.actions;
export const selectUser=(state)=>state.user.user;
export default UserSlice.reducer;
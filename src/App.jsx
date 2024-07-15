import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./Features/Userslice.js";
import { selectUser } from "./Features/Userslice.js";
import { auth } from "./Components/firebase/firebase.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Login from "./Components/Auth/Login.jsx";
import Signup from "./Components/Auth/Signup.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import UpdateProfile from "./Components/Profile/UpdateProfile.jsx";

import UserList from "./Components/Chats/UserList.jsx";
import axios from "axios";
import "./App.css";
import NewChat from "./Components/Chats/NewChat.jsx";
import Chat from "./Components/Chats/Chat.jsx";

import NoChats from "./Components/NoChats/NoChats.jsx";
import NotLoggedin from "./Components/NotLoggedin/NotLoggedin.jsx";
import LeftPortion from "./Home.jsx";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const res = await axios.get(
          `https://livechat-backend-j9re.onrender.com/api/user?fid=${authUser.uid}`
        );
        const User = res.data;
        dispatch(
          login({
            fid: authUser.uid,
            username: User.username,
            email: User.email,
            photo: User.photo,
            _id: User._id,
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            fid: authUser.uid,
            username: User.username,
            email: User.email,
            photo: User.photo,
            _id: User._id,
          })
        );
      } else {
        dispatch(logout());
        localStorage.setItem("user", JSON.stringify({}));
      }
    });
  }, [dispatch]);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar />
      

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div className="flex ">
                <LeftPortion />
                <NoChats />
              </div>
            ) : (
              <NotLoggedin />
            )
          }
        />
        <Route
          path="/chat/:chatid"
          element={
            <RequireAuth>
              <div className="flex ">
                <LeftPortion />
                <Chat />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/newchat/:userid"
          element={
            <RequireAuth>
              <div className="flex ">
                <LeftPortion />
                <NewChat />
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/creategrp"
          element={
            <RequireAuth>
              <div className="flex ">
                <LeftPortion />
                <UserList isgrp={true} />
              </div>
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/updateprofile"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;

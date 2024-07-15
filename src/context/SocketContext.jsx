import { createContext,useState,useEffect,useContext} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Features/Userslice";
import io from "socket.io-client"

const SocketContext=createContext();

export const useSocketContext=()=>{
  return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
  const [socket,setSocket]=useState(null)
  const [onlineUsers,setOnlineusers]=useState([])

  const currentUser=useSelector(selectUser)

  useEffect(()=>{
    if(currentUser){
      const socket=io("https://livechat-backend-j9re.onrender.com",{
        query:{
          userId:currentUser._id,
        }
      })
      setSocket(socket)

      socket.on("getOnlineUsers",(users)=>{
        setOnlineusers(users)
        console.log("socket")
      })

      return ()=> socket.close();
    }else{
      if(socket){
        socket.close();
        setSocket(null)
      }

    }

  },[])

  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>

  }

import React, { useLayoutEffect, useState, useEffect } from "react";
import "./UserList.css";
import axios from "axios";

function UserList() {
  const [usersList, setusersList] = useState([]);
  const [displaydata, setdisplaydata] = useState([]);
  const [searchtext, setsearchtext] = useState("");

  useLayoutEffect(() => {
    const renderData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user");
        setusersList(res.data);
        setdisplaydata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    renderData();
  }, []);

  useEffect(()=>{
    const filterData = () => {
      if (searchtext !== "") {
        const filteredData = usersList.filter((user) => 
  
        (user.username.toLowerCase().includes(searchtext.toLowerCase()) ||
        user.email.includes(searchtext.toLowerCase()))
        );
        setdisplaydata(filteredData);
      } else {
        setdisplaydata(usersList);
      }
    };
    filterData()

  },[searchtext])

  

  return (
    <div className="userList bg-slate-200 p-8">
      <div>
        <input
          type="text"
          value={searchtext}
          onChange={(e) => {
            setsearchtext(e.target.value)
          }}
          id="search-text"
        
        />
      </div>
      {displaydata.length > 0 ? (
        <>
          {displaydata.map((user) => (
            <div>
              {user.username},{user.email}
            </div>
          ))}
        </>
      ) : (
        <>
          <h2>No user</h2>
        </>
      )}
    </div>
  );
}

export default UserList;

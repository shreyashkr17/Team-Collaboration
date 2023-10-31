import React, { useState } from "react";
import "./css/Navbar.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Navbar() {
  const [setting, setSetting] = useState(false);
  const [more, setMore] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomName,setRoomName] = useState("");

  const handleCreateRoomSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/rooms/create",
        {
          roomname: roomName,
        },
        {
          withCredentials: true,
        }
      );

      if(response.status === 201){
        console.log('Room created Successfully');
        closeCreateRoom();
      }else{
        console.log("Room Creation failed");
      }
    } catch (error) {
      console.error("Room Creation failed", error);
    }
  };

  const handleSettingClick = () => {
    if (more === true) {
      setMore(false);
    }
    setSetting(!setting);
  };
  const handleMoreClick = () => {
    if (setting === true) {
      setSetting(false);
    }
    setMore(!more);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Logout Successfull");
        navigate("/signin");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleCreateRoom = () => {
    setCreateRoom(true);
  };

  const closeCreateRoom = () => {
    setCreateRoom(false);
  };
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div className="Navbar">
        <div className="NavbarTitle">
          <h1>T-Collab</h1>
        </div>
        <div className="UserInfo">
          <div className="Username">
            <h1>username</h1>
          </div>
          <div className="Userrole">
            {/* {user.role === "team_member" ? (
              <span>
                <h1>Member</h1>
              </span>
            ) : (
              <span>
                <h1>Admin</h1>
              </span>
            )} */}
            <span>
                <h1>Member</h1>
            </span>
          </div>
        </div>
        <div className="settingIcon">
          <div className="SettingsIcon">
            <SettingsIcon
              onClick={handleSettingClick}
              fontSize="large"
              style={{ margin: "auto", color: "white", cursor: "pointer" }}
            />
          </div>
          <div className="SettingsIcon">
            <MoreVertIcon
              onClick={handleMoreClick}
              fontSize="large"
              style={{ margin: "auto", color: "white", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {setting ? (
        <div className="SettingList">
          <ul>
            <li style={{ cursor: "pointer" }}>
              <h1>Update Profile</h1>
            </li>
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              <h1>Logout</h1>
            </li>
          </ul>
        </div>
      ) : null}

      {more ? (
        <div className="MoreList">
          <ul>
            {user.role === "admin" ? (
              <li style={{ cursor: "pointer" }} onClick={handleCreateRoom}>
                <h1>Create Rooms</h1>
              </li>
            ) : null}
            <li style={{ cursor: "pointer" }}>
              <h1>More</h1>
            </li>
          </ul>
        </div>
      ) : null}

      {createRoom ? (
        <div className="createRoomCont">
          <div className="CreateRoomTitle">
            <h1>Create Rooms</h1>
          </div>
          <div className="CrSubtitle">
            <h3>Enter the name of the room:</h3>
          </div>
          <div className="CrInput">
            <input
              type="text"
              placeholder="The room can only be created only by Admin"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="Crbutton">
            <button onClick={handleCreateRoomSubmit}>Create Room</button>
          </div>
          <div className="Crbutton">
            <button onClick={closeCreateRoom}>Close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;

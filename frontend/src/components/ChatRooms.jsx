import React, { useEffect, useState } from "react";
import "./css/ChatRooms.css";
import GroupsIcon from "@mui/icons-material/Groups";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./css/RoomMessage.css";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CameraIcon from "@mui/icons-material/Camera";
import ContactsIcon from "@mui/icons-material/Contacts";
import PollIcon from "@mui/icons-material/Poll";
import GifIcon from "@mui/icons-material/Gif";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
// import { set } from "mongoose";
import AddMember from "./AddMember";
import { useSelector } from "react-redux";
import RemoveMember from "./RemoveMember";

function ChatRooms({ roomName }) {
  const [adminName, setAdminName] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [specificRoom, setSpecificRoom] = useState(false);
  const [attachCont, setAttachCont] = useState(false);
  const [fileAttach, setFileAttach] = useState(false);
  const [roomMore, setRoomMore] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [removeMember, setRemoveMember] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/rooms/getAdminNameForRoom",
          {
            roomname: roomName,
          },
          {
            withCredentials: true,
          }
        );

        setAdminName(response.data.adminName);
      } catch (err) {
        console.error("Error fetching admin name:", err);
      }
    };

    const fetchUsersInRoom = async (req, res) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/rooms/getUsersInRoom",
          {
            roomname: roomName,
          },
          {
            withCredentials: true,
          }
        );

        setUsersInRoom(response.data.usersInRoom);
      } catch (error) {
        console.error("Error fetcjing users in the room:", error);
      }
    };

    fetchAdminName();
    fetchUsersInRoom();

    const intervalId = setInterval(fetchUsersInRoom,10000);

    return () => clearInterval(intervalId);
  }, [roomName]);

  const handleSpecificRoom = () => {
    setSpecificRoom(!specificRoom);
  };  

  const handleAttachCont = () => {
    if(fileAttach === true){
      setFileAttach(false);
    }
    setAttachCont(!attachCont);
  };

  const handleFileAttach = () => {
    if(attachCont === true){
      setAttachCont(false);
    }
    setFileAttach(!fileAttach);
  };

  const handleRoomMore = () => {
    setRoomMore(!roomMore);
  }

  const handleAddMemeber = () => {
    setAddMember(!addMember);
  }
  const closeHandleAddMember = () => {
    setAddMember(false);
  }

  const handleRemoveMember = () => {
    setRemoveMember(!removeMember);
  }
  const closeHandleRemoveMember = () => {
    setRemoveMember(false);
  }

  return (
    <>
      <div className="ChatRooms">
        <div className="ChatRoomsNav">
          <div className="RoomInfo">
            <span>
              <GroupsIcon
                fontSize="large"
                style={{ margin: "auto", color: "white" }}
              />
            </span>
            <div
              className="RoomName"
              style={{ cursor: "pointer" }}
              onClick={handleSpecificRoom}
            >
              <h1>{roomName}</h1>
            </div>
          </div>
          <div className="roomSetting">
            <span>
              <MoreVertIcon
                fontSize="large"
                style={{ margin: "auto", color: "white", cursor: "pointer" }}
                onClick ={handleRoomMore}
              />
            </span>
          </div>
        </div>
        <div className="RoomMessage">
          <div className="AllMessages"></div>
          <div className="InputMessage">
            <div className="InputCont">
              <input type="text" placeholder="Enter your message here" />
            </div>
            <div className="IconsCont">
              <span>
                <SendIcon
                  fontSize="large"
                  style={{ color: "white", margin: "auto", cursor: "pointer" }}
                />
              </span>
              <span>
                <AttachmentIcon
                  fontSize="large"
                  style={{ color: "white", margin: "auto", cursor: "pointer" }}
                  onClick={handleFileAttach}
                />
              </span>
              <span>
                <AddIcon
                  fontSize="large"
                  style={{ color: "white", margin: "auto", cursor: "pointer" }}
                  onClick={handleAttachCont}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {specificRoom && (
        <div className="SpecificRoomInfo">
          <div className="roomNameSpeci">
            <h1>{roomName}</h1>
          </div>
          <div className="roomMember">
            <div className="createdBy">
              <h1>
                Created By: <span>{adminName}</span>
              </h1>
            </div>
            <div className="createdBy">
              <h1>Members</h1>
            </div>
            <ul>
              {usersInRoom.map((user) => (
                <li key={user._id}>
                  <h1>
                    {user.username} &nbsp; ({user._id})
                  </h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {attachCont && (
        <div className="AttachmentCont">
          <div className="iCon">
            <SummarizeIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
          <div className="iCon">
            <CameraIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
          <div className="iCon">
            <ContactsIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
          <div className="iCon">
            <PollIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
          <div className="iCon">
            <GifIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
          <div className="iCon">
            <AddIcon
              fontSize="large"
              style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
            />
          </div>
        </div>
      )}

      {fileAttach && (
        <div className="FileAttach">
          <div className="FIleLIst">
            <span className="FileIcon">
              <AudioFileIcon
                fontSize="large"
                style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
              />
            </span>
            <span className="fileTitle">
              <h1>Audio File</h1>
            </span>
          </div>
          <div className="FIleLIst">
            <span className="FileIcon">
              <PictureAsPdfIcon
                fontSize="large"
                style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
              />
            </span>
            <span className="fileTitle">
              <h1>PDF File</h1>
            </span>
          </div>
          <div className="FIleLIst">
            <span className="FileIcon">
              <ArticleIcon
                fontSize="large"
                style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
              />
            </span>
            <span className="fileTitle">
              <h1>Doc File</h1>
            </span>
          </div>
          <div className="FIleLIst">
            <span className="FileIcon">
              <AddIcon
                fontSize="large"
                style={{ cursor: "pointer", color: "#00a884", margin: "auto" }}
              />
            </span>
            <span className="fileTitle">
              <h1>More</h1>
            </span>
          </div>
        </div>
      )}
      {roomMore && (
        <div className="ChatRoomMoreCont">
          <li className="RoomMoreList" onClick={handleAddMemeber}>
            <h1>Add members</h1>
          </li>
          <li className="RoomMoreList" onClick={handleRemoveMember}>
            <h1>Remove members</h1>
          </li>
        </div>
      )}

      {addMember && <AddMember roomName={roomName} closeAddMember={closeHandleAddMember}/>}
      {removeMember && <RemoveMember roomName={roomName} closeHandleRemoveMember={closeHandleRemoveMember}/>}
    </>
  );
}

export default ChatRooms;

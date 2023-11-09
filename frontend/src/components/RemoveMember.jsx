import React, { useState } from 'react'
import './css/AddMember.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

function RemoveMember({closeHandleRemoveMember, roomName}) {
    const [username,setUsername] = useState("");    

    const handleClose = () => {
        closeHandleRemoveMember();
    }

    const user = useSelector((state) => state.user.user);

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/rooms/removeUserFromRoom',{
                username: username,
                roomname: roomName,
            },{
                withCredentials: true,
            });

            if(response.status == 200){
                console.log("User added successfully");
                closeHandleRemoveMember();
            }else{
                console.log('Failed to add user to the room');
            }
        } catch (error) {
            console.error('Error adding the user to the room:',error)
        }
    }

  return (
    <div className='AddMember'>
        <div className="AddMemberTitle">
            <h1>REMOVE MEMBER</h1>
        </div>
        <div className="AddMemberTitle" style={{marginTop:"10px",color:"white"}}>
            <h2>Enter the username:</h2>
        </div>
        <div className="AddMemberInput" style={{marginTop:"10px",color:"white"}}>
            <input type="text" placeholder='Name of the user you want to add in the room' value={username}onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="AddMemberButton" style={{marginTop:"10px",color:"white"}}>
            <button onClick={handleAddUser}>REMOVE USER</button>
        </div>
        <div className="AddMemberButton" style={{marginTop:"10px",color:"white"}}>
            <button onClick={handleClose}>CLOSE</button>
        </div>
    </div>
  )
}

export default RemoveMember

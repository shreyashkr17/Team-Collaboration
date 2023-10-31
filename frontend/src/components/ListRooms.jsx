import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './css/RoomList.css'
import { useDispatch, useSelector } from 'react-redux';
import { setUserAddedRooms } from '../redux/reducer';
import {setRoomsCreatedByAdmin} from '../redux/reducer';
import axios from 'axios';

function ListRooms({onRoomSelect}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user); 
    const userAddedRooms = useSelector((state) => state.user.userAddedRooms);
    const roomsCreatedByAdmin = useSelector((state) => state.user.roomsCreatedByAdmin);
    const [isAdmin, setIsAdmin] = useState(false);

    console.log(user);

    useEffect(() => {
        const fetchUserAddedRooms = async () => {
            if(user && user.username){
                try {
                    // console.log("Username before",user.username);
                    if(user.role === "team_member"){
                        const response = await axios.post('http://localhost:3000/rooms/getRoomsForUser', {
                            username: user.username,
                        },{
                            withCredentials: true,
                        });
                        // console.log("Username after",user.username);
    
                        const userAddedRooms = response.data.userAddedRooms;
                        dispatch(setUserAddedRooms(userAddedRooms));
                        // console.log("User-added rooms:", userAddedRooms);
                    }else if(user.role === "admin"){
                        const response = await axios.post('http://localhost:3000/rooms/getRoomsCreatedByAdmin',{
                            adminUsername: user.username,
                        },{
                            withCredentials: true,
                        });
                        const room = response.data.roomsCreatedByAdmin;
                        // console.log(response.data);
                        setIsAdmin(true);
                        dispatch(setRoomsCreatedByAdmin(room));
                    }
                } catch (error) {
                    console.error("Error fetching user-added rooms:",error);
                }
            }
        }

        fetchUserAddedRooms();

        const refreshInterval = setInterval(() => {
            fetchUserAddedRooms();
        }, 1000);
        
        return () => clearInterval(refreshInterval);

    }, [dispatch,user]);

  return (
    <div className='RoomsList'>
        <div className="roomContNav">
            <div className="inputCont">
                <input type="text" placeholder='Enter the room name'/>
            </div>
            <div className="moreDiv">
                <MoreVertIcon style={{margin:"auto", color:"white", cursor:"pointer"}}/>
            </div>
        </div>
        <ul className='listRoomsCont'>
            {isAdmin ? (
                roomsCreatedByAdmin && roomsCreatedByAdmin.length > 0 ? (
                    roomsCreatedByAdmin.map((room) => (
                    <li className='RoomLi' key={room._id} onClick={() => onRoomSelect(room.roomname)}>
                        <div className="roomName">
                            <h1>{room.roomname}</h1>
                        </div>
                    </li>
                ))):(
                    <li className='RoomLi'>
                        <div className="roomName">
                            <h1>No rooms available</h1>
                        </div>
                    </li>
                )
            ):(
                userAddedRooms && userAddedRooms.length > 0 ? (
                    userAddedRooms.map((room) => (
                    <li className='RoomLi' key={room._id} onClick={() => onRoomSelect(room.roomname)}>
                        <div className="roomName">
                            <h1>{room.roomname}</h1>
                        </div>
                    </li>
                ))):(
                    <li className='RoomLi'>
                        <div className="roomName">
                            <h1>No rooms available</h1>
                        </div>
                    </li>
                )
            )}
        </ul>
    </div>
  )
}

export default ListRooms

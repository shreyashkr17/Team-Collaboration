import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useSelector} from 'react-redux'
import './css/Home.css'
import Navbar from '../components/Navbar';
import ListRooms from '../components/ListRooms';
import ChatRooms from '../components/ChatRooms';
import NoRooms from '../components/NoRooms';

function Home() {
    

  const user = useSelector((state) => state.user.user);

  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const handleSelectedRoom = (roomName) => {
    setSelectedRoom(roomName)
  }

    
  return (
    <div className='Homepage'>
      <Navbar/>
      <div className="DashRoomAndChat">
        <ListRooms onRoomSelect={handleSelectedRoom}/>
        {selectedRoom ? (
          <ChatRooms roomName={selectedRoom}/>
        ):(
          <NoRooms user={user}/>
        )}
      </div>
    </div>
  )
}

export default Home

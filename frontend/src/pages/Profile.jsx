import React from 'react'
import Navbar from '../components/Navbar'
import './css/Profile.css'
import ProfileContainer from '../components/ProfileContainer'

function Profile() {
  return (
    <>
        <div className='ProfilePage'>
            <Navbar/>
            <ProfileContainer/>
        </div>
    </>
    
  )
}

export default Profile

import React from 'react'
import './css/ProfileCont.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProfileContainer() {
  return (
    <div className='ProfileCont'>
      <div className="leftUserCont">
        <div className="userLogo">
            <AccountCircleIcon style={{margin:"auto", fontSize:"10em", color:"white"}} />
        </div>
        <span>
            <h1>Username</h1>
        </span>
      </div>
      <div className="rightSideInfo">
        <span className="TitleProfile">
          <h1>PROFILE INFORMATION</h1>
        </span>
        <div className="infoCont">
          <span className='infoHead'>
            <h2>Username:</h2>
          </span>
          <span className='infoHead' style={{marginLeft:"10px"}}>
            <h3>Shreyash Kumar</h3>
          </span>
        </div>
        <div className="infoCont">
          <span className='infoHead'>
            <h2>Email:</h2>
          </span>
          <span className='infoHead' style={{marginLeft:"10px"}}>
            <h3>rshreyash08@gmail.com</h3>
          </span>
        </div>
        <div className="infoCont">
          <span className='infoHead'>
            <h2>Role:</h2>
          </span>
          <span className='infoHead' style={{marginLeft:"10px"}}>
            <h3>Member</h3>
          </span>
        </div>
        <div className="UpdateButton">
          <button>Update Profile</button>
        </div>
        <div className="UpdateButton">
          <button>Close Profile</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileContainer

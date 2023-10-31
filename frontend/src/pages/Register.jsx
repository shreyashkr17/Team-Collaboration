import React from 'react'
import './css/Signin.css'
import './css/register.css'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='Signin'>
      <div className="signContainer">
        <div className="SignInHeader">
            <h1>Sign In Page</h1>
        </div>
        <label className='SubLabel'>Username</label>
        <input type="text" name="" id="" className='subInput' />
        <label className='SubLabel'>Email</label>
        <input type="email" name="" id="" className='subInput' />
        <label className='SubLabel'>Password</label>
        <input type="password" name="" id="" className='subInput' />
        <label className='SubLabel'>Role</label>
        <select name="" id="" className='RoleSelection'>
            <option value="">Select Role</option>
            <option value="">Admin</option>
            <option value="">Team</option>
        </select>
        <div className="SignInBtn">
            <button>Register</button>
        </div>
        <label className='SubLabel2'>
            <Link to="/signin">Already a member ? Get Sign in</Link>
        </label>
      </div>
    </div>
  )
}

export default Register

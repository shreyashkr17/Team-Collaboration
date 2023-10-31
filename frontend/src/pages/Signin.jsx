import React, { useState } from "react";
import "./css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../redux/action";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login Successfull");
        // console.log(response.data.user);
        dispatch(setUser(response.data.user));
        navigate("/");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="Signin">
      <div className="signContainer">
        <div className="SignInHeader">
          <h1>Sign In Page</h1>
        </div>
        <label className="SubLabel">Email</label>
        <input
          type="email"
          className="subInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="SubLabel">Password</label>
        <input
          type="password"
          className="subInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="SignInBtn">
          <button onClick={handleLogin}>Sign In</button>
        </div>
        <label className="SubLabel2">
          <Link to="/register">Get Register</Link> |{" "}
          <Link to="/forgotPwd">Forgot Password</Link>
        </label>
      </div>
    </div>
  );
}

export default Signin;

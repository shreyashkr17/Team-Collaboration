import "./App.css";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Protected from "./redux/Protected";
import ChatRooms from "./components/ChatRooms";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Protected>
            <Home/>
          </Protected>
        } />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/chat/:roomName" element={<ChatRooms/>}/> */}
        <Route path="/me" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;

const express =require("express");
const mongoose = require("mongoose");
const bodyParser =  require("body-parser");
const cors = require("cors")
const userRouter = require('./Router/userRouter');
const roomRouter = require('./Router/RoomRouter');
// const chatSocket = require()
const http = require("http");
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser")

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// io.on("connection",(socket) => {
//     console.log('A user connected')

//     // Handle Socket events and chat logic here
//     socket.on("joinRoom",({username,roomname}) => {
//         console.log(`${username} joined ${roomname}`)
//         socket.join(roomname);
//         socket.broadcast.to(roomname).emit("notification",{
//             body:`${username} joined the room`,
//             user:"admin"
//         })
//     })

//     socket.on("chatMessage",({message,roomname,username}) => {
//         io.to(roomname).emit("newMessage",{
//             body:message,
//             user:username
//         })
//     })
// });

// app.set('io',io);

app.use(cors({
    origin:"http://localhost:3001",
    credentials:true,
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('Connected to the Mongodb');
})
.catch((error)=>{
    console.error('MongoDB connection error',error);
})

// Intialise chat socket


app.use('/users',userRouter);
app.use('/rooms',roomRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})
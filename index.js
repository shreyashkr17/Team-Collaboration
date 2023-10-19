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

app.use(cors());
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
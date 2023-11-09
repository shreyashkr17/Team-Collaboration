import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./Router/userRouter";
import roomRouter from "./Router/RoomRouter";
import http from "http";
import cookieParser from "cookie-parser";

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);


app.use(cors({
    origin:"http://localhost:3001",
    credentials:true,
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_DB as string,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
} as mongoose.ConnectOptions)
.then(()=>{
    console.log('Connected to the Mongodb');
})
.catch((error)=>{
    console.error('MongoDB connection error',error);
})



app.use('/users',userRouter);
app.use('/rooms',roomRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})
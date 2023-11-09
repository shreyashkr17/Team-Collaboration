// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
import mongoose, {Document, Schema} from "mongoose";
import bcrypt from 'bcryptjs'

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    role:'admin'|'team_member';
    token?:string;
    socketId?:string;
}

const userSchema = new Schema<User>({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','team_member'],
        required:true
    },
    token:{
        type:String,
    },
    socketId:{
        type:String,
    }
});

userSchema.pre('save',async function (next:(error?:Error) => void){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error as Error);
    }
})

const UserModel = mongoose.model<User>('User',userSchema);

export default UserModel;
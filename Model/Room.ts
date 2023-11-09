import mongoose, {Document, Schema} from "mongoose";

interface IRoom extends Document {
    roomname:string;
    createdBy:mongoose.Types.ObjectId;
    addedUsers:mongoose.Types.ObjectId[];
    message:mongoose.Types.ObjectId[];
}

const roomSchema = new Schema<IRoom>({
    roomname:{
        type:String,
        required:true,
        unique:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    addedUsers:[
        {
            type:Schema.Types.ObjectId,
            ref:'User',
        },
    ],
    message:[
        {
            type:Schema.Types.ObjectId,
            ref:'Message',
        }
    ]
})

const Room = mongoose.model<IRoom>('Room',roomSchema);
export default Room;
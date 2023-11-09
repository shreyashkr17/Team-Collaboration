import mongoose, {Document, Schema} from 'mongoose';

interface IMessage extends Document {
    text:string;
    user:mongoose.Types.ObjectId;
    room?:mongoose.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
    text:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    room:{
        type:Schema.Types.ObjectId,
        ref:'Room'
    }
});

const Message = mongoose.model<IMessage>('Message',messageSchema);
export default Message;
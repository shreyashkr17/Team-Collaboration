const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content:String,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
    },
});

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;
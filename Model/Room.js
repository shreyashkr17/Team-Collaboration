const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomname:{
        type:String,
        required:true,
        unique:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    addedUsers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],
})

const Room = mongoose.model('Room',roomSchema);
module.exports = Room;
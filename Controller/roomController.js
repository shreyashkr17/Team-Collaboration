const Room = require('../Model/Room');
const User = require('../Model/UserModel');

const createRoom = async (req,res)=>{
    try {
        const {roomname} = req.body;

        const createdBy = req.user._id;

        const existingRoom = await Room.findOne({roomname});

        if(existingRoom){
            return res.status(400).json({message:'Room already exists'});
        }

        const newRoom = new Room({
            roomname,
            createdBy
        })

        await newRoom.save();
        res.status(201).json({message:"Room created Successfully"});
    } catch (error) {
        console.log('Error creating room:',error);
        res.status(500).json({
            message:"Room creation failed"
        })
    }
};

const listRooms = async (req, res) => {
    try{
        const rooms = await Room.find().select('roomname');

        res.status(200).json({rooms});
    }catch(error){
        console.error('Error listing rooms:',error);
        res.status(500).json({message:'Failed to list rooms'});
    }
};

const addUserToRoom = async (req,res) => {
    try {
        const {username, roomname} = req.body;
        const adminId = req.user._id;

        const admin = await User.findById(adminId);

        if(!admin){
            return res.status(403).json({message:"Only admins can add user to rooms"});
        }

        const room = await Room.findOne({roomname});
        if(!room){
            return res.status(404).json({message:"Room Not Found"});
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(room.addedUsers.includes(user._id)){
            return res.status(400).json({message:"User is already in the room"});
        }

        room.addedUsers.push(user._id);
        await room.save();

        res.status(200).json({message:"User added to the room succesfully"})
    } catch (error) {
        console.error('Error adding user to room:', error);
        res.status(500).json({ message: 'Failed to add user to the room' });
    }
}

const getUserInRoom = async (req,res) => {
    try{
        const {roomname} = req.body;

        const room = await Room.findOne({roomname});

        if(!room){
            return res.status(404).json({message:"Room Not Found"});
        }

        const userIds = room.addedUsers;
        // console.log(userIds);

        const usersInRoom = await User.find({
            _id:{$in:userIds},
            $or:[{role:'admin'}, {role:'team_member'}],
        }).select('username role');

        res.status(200).json({usersInRoom});
    }catch(err){
        console.error('Error getting users in room:', err);
        res.status(500).json({ message: 'Failed to retrieve users in the room' });
    }
}

const getRoomsForUser = async (req,res) => {
    try{
        const {username} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(user.role !== 'team_member'){
            return res.status(403).json({message:"Permission denied"});
        }
        const userAddedRooms = await Room.find({
            addedUsers:user._id,
        }).populate('createdBy', 'username')
        .select('roomname createdBy');

        res.status(200).json({
            userAddedRooms,
        })
    }catch(err){
        console.error('Error getting user rooms', err);
        res.status(500).json({message:"Failed to retrieve user rooms"});
    }
};

const getAdminNameFromRoom = async (req,res) => {
    try {
        const {roomname} = req.body;

        const room = await Room.findOne({roomname});

        if(!roomname){
            return res.status(404).json({message:"Room not Found"});
        }

        const createdByUserId = room.createdBy;

        const admin = await User.findById(createdByUserId).select('username');

        if(!admin){
            return res.status(404).json({message:"Admin Not Found"});
        }

        res.status(200).json({adminName: admin.username});
    } catch (error) {
        console.error('Error getting admin name for room:',error);
        res.status(500).json({message:"Failed to retrieve admin name for the room name"});
    }
}


const getRoomsCreatedByAdmin = async (req,res) => {
    try {
        const {adminUsername} = req.body;

        const admin = await User.findOne({username:adminUsername});

        if(!admin || admin.role !== 'admin'){
            return res.status(404).json({message:"Admin not found"});
        }

        const roomsCreatedByAdmin = await Room.find({createdBy:admin._id}).select('roomname');

        res.status(200).json({roomsCreatedByAdmin});
    } catch (error) {
        console.error('Error getting rooms created by admin:', error);
        res.status(500).json({ message: 'Failed to retrieve rooms created by admin' });
    }
}

module.exports = {
    createRoom,
    listRooms, 
    addUserToRoom, 
    getUserInRoom, 
    getRoomsForUser, 
    getAdminNameFromRoom,
    getRoomsCreatedByAdmin,
};
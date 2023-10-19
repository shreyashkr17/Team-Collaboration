const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


// const TOKEN = "token123"
dotenv.config();


const register = async (req,res) => {
    try{
        const {username,email,password,role} = req.body;

        const existingUser = await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({
                message:'User already exist'
            })
        }

        const newUser = new User({
            username,
            email,
            password,
            role,
        });

        await newUser.save();

        res.status(201).json({message:"User registered succesfully"});
    }catch(error){
        console.log('Error during registration',error);
        res.status(500).json({
            message:"Registration failed"
        })
    }
};

// Login of User
const Login = async (req,res) => {
    try{
        const {email,password}  = req.body;


        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const token = jwt.sign(
            {userId:user._id,email:user.email,role:user.role},
            process.env.TOKEN_SECRET,
            {expiresIn:'1h'}
        );

        res.cookie("token",token, {httpOnly:true});

        res.status(200).json({token,message:"Login Successful"});
    }catch(err){
        console.log("Error during login:",err);
        res.status(500).json({message:'Login failed'});
    }
}

const Logout = async (req,res) =>{
    try{
        const tokenCookie = req.cookies.token;

        if(!tokenCookie){
            return res.status(401).json({
                message:"User not authenticated"
            });
        }

        res.clearCookie("token");

        res.status(200).json({message:"Logout Succesfull"})
    }catch(err){
        console.log("Error during logout:",err);
        res.status(500).json({
            message:"Logout failed"
        })
    }
}


const listTeamMembers = async (req,res) => {
    try {
        const teamMembers = await User.find({role:"team_member"});
        res.status(200).json({teamMembers});
    } catch (error) {
        console.error('Error listing team members:',error);
        res.status(500).json({message:'Failed to list team members'});
    }
}
const listAdminMember = async (req,res) => {
    try {
        const adminMembers = await User.find({role:"admin"});
        res.status(200).json({adminMembers});
    } catch (error) {
        console.error('Error listing admin members:',error);
        res.status(500).json({message:'Failed to list admin members'});
    }
}

const updateRoleToAdmin = async (req,res) => {
    try{
        const {username} = req.params;
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        if(user.role === "team_member"){
            user.role = "admin";
            await user.save();
            return res.status(200).json({message:"Role Updated to Admin"});
        }else{
            return res.status(400).json({message:"User is not a team-member"})
        }
    }catch(error){
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role' });
    }
}
const updateRoleToMember = async (req,res) => {
    try{
        const {username} = req.params;
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        if(user.role === "admin"){
            user.role = "team_member";
            await user.save();
            return res.status(200).json({message:"Role Updated to Team Member"});
        }else{
            return res.status(400).json({message:"User is not a Admin"})
        }
    }catch(error){
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Failed to update user role' });
    }
}

module.exports = {register,Login, Logout, listTeamMembers,listAdminMember, updateRoleToAdmin}
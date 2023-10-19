const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Model/UserModel");

dotenv.config();

const authenticateRole = (requiredRole) => {
    return async (req,res,next) => {
        try{
            const {token} = req.cookies;
            if(!token){
                return res.status(401).json({message:"User not authenticated"});
            }

            console.log('Recieved token',token);
            const x = process.env.TOKEN_SECRET;
            console.log('Token secret',x);
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('Decoded token',decodedToken);

            const user = await User.findById(decodedToken.userId);

            if(!user){
                return res.status(401).json({
                    message:"User not found"
                })
            }

            if(user.role != requiredRole){
                return res.status(403).json({
                    message:"Permission denied"
                })
            }

            req.user = user;

            next();
        }catch(err){
            console.log('Authentication error:',err);
            res.status(500).json({
                message:"Authentication failed"
            })
        }
    } 
}
module.exports = authenticateRole
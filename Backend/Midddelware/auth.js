import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js'
import dotenv from 'dotenv';
dotenv.config()
const JWT_SECRET_KEY = process.env.KEY; 

export default async function authMiddelware(req,res,next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authorization.startsWith('Bearer') ){
        res.status(401).json({message:"Not authorizes token missing"})
    }
   // verify token 
   try {
    const payload = jwt.verify(token,JWT_SECRET_KEY)
    const user = await User.findById(payload.id).select('-password')
    if(!user){
        return res.status(401).json({message:'User not found'})
    }
   req.user =user;
   next()
   } catch (error) {
    console.error("JWT Verification failed ",error)
    res.status(401).json({message:"Invalid token or expried"}
    )
   }
}
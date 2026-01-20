import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

// DB conncection
export const ConnectDB = async()=>{
    await mongoose.connect(process.env.URI) 
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log('DB Connection error',err))
}
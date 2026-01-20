
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
}, 
{
    timestamps:true
})

// Creating Collection
export default mongoose.model.User || mongoose.model("User",userSchema)
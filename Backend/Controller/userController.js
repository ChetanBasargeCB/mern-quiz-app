import mongoose from "mongoose";
import User from "../Model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET_KEY = process.env.KEY;


//Register

export async function Register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // User Exiest
   //.lean()Converts Mongoose documents into plain JavaScript objects
    const exiest = await User.findOne({ email }).lean();
    if (exiest)
      return res
        .status(409)
        .json({ success: false, message: "User already exiests" });

    const newID = new mongoose.Types.ObjectId();
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: newID,
      name,
      email,
      password: hashPassword,
    }); 

    await user.save();
    //! Jwt token not found
    if (!JWT_SECRET_KEY) throw new Errorr("Jwt token not found in server");

    //! token Genrator
    const token = jwt.sign({ id: newID.toString() }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Account Created Successfully!!",
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email },
      });
      console.log("acoount crated")
  } catch (error) {
    console.error("Register eroor ", error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// login

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid or email" });
    }
    // password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res 
      .status(201)
      .json({
        success: true,
        message: "Login  Successfully!!",
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email },
      });

  }
   catch (error) {
      console.error("Login error ", error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
}


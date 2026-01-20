import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ConnectDB } from './config/db.js';
import userRouter from './Routes/userRoutes.js';
import resultRouter from './Routes/resultRoutes.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT;

// Middelware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//DB
 ConnectDB()

//Routes (Protected)
app.use("/api/auth",userRouter)
app.use("/api/result",resultRouter)
app.get("/",(req,res)=>{
    res.send("Home")
})

app.listen(PORT,()=>console.log(` Server Started at  http://localhost:${PORT}`))

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import userRouter from './Routes/userRoutes.js';
import quizRouter from './Routes/quizRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
ConnectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/auth/quiz", quizRouter); // Prefix for all quiz actions

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));
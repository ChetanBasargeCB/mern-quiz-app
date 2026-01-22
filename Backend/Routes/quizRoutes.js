import express from 'express';
import generateQuizFromAI from '../Controller/quizController.js';
import verifyToken from '../Midddelware/auth.js'; // Ensure path is correct

const quizRouter = express.Router();

// This will now map to: POST /api/auth/quiz/generate
quizRouter.post("/generate", verifyToken, generateQuizFromAI);

export default quizRouter;
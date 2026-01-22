import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);

const genrateQuiz = async (tech, level) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a quiz about ${tech} at a ${level} difficulty. 
  Return exactly 5 questions in this JSON format:
  [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0 (index of correct option)
    }
  ]
  Return only the JSON array without any markdown formatting or code blocks.`;

    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
};

export default genrateQuiz
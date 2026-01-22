import genrateQuiz from "../config/aigenerator.js";

const generateQuizFromAI = async (req, res) => {
  try {
    const { tech, level } = req.body;
    if (!tech || !level) {
      return res.status(400).json({ message: "Tech and Level are required" });
    }

    const quizData = await genrateQuiz(tech, level);
    res.status(200).json(quizData);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to generate quiz with AI" });
  }
};

 export default generateQuizFromAI
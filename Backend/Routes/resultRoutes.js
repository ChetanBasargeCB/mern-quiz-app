import express from 'express'
import authMiddelware from '../Midddelware/auth.js'
import { createResult, listResult } from '../Controller/resultController.js';

const resultRouter = express.Router();

resultRouter.post("/",authMiddelware, createResult)
resultRouter.get("/",authMiddelware,listResult )

export default resultRouter

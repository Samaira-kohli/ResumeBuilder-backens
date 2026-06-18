import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary } from "../controller/ai.controller.js";

const aiRouter = express.Router()

aiRouter.post('/enhance-pro-sum', authMiddleware, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', authMiddleware, enhanceJobDescription)

export default aiRouter
import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { createResume, deleteResume, getResumeById, updateResume } from "../controller/resume.controller.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router()

resumeRouter.post('/create', authMiddleware, createResume)
resumeRouter.put('/update', upload.single('image'), authMiddleware, updateResume)
resumeRouter.delete('/delete/:resumeId', authMiddleware, deleteResume )
resumeRouter.get('/get/:resumeId', authMiddleware, getResumeById )


export default resumeRouter
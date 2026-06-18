import express from 'express'
import { getUserById, getUserResumes, loginUser, logoutUser, registerUser } from '../controller/User.controller.js' 
import { authMiddleware } from '../Middlewares/authMiddleware.js'

const userRouter = express.Router()

 userRouter.post('/register', registerUser)
 userRouter.post('/login', loginUser)
 userRouter.get('/data', authMiddleware, getUserById)
 userRouter.get('/resumes', authMiddleware, getUserResumes)
 userRouter.post('/logout', logoutUser)

 export default userRouter
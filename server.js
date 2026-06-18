import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import resumeRouter from './routes/resumeRoutes.js'
import aiRouter from './routes/aiRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3000

//connect to db
await connectDB()
app.use(cookieParser())

app.use(cors({
    origin: 'https://resume-builder-tau-five-89.vercel.app/',
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hi')
})

app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
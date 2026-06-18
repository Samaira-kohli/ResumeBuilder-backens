import jwt from "jsonwebtoken"
import userModel from "../models/User.models.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: 'token missing'
            })
        }

        const decode = jwt.verify(token, process.env.MY_SECRET_KEY)
        const user = await userModel.findById(decode.userId)
        if (!user) {
            return res.status(404).json({
                message: 'no user found'
            })
        }
        req.userId = user._id
        next()
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
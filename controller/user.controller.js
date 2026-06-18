import userModel from '../models/User.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from '../models/Resume.models.js'

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.MY_SECRET_KEY, { expiresIn: '7d' })
    return token;
}

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(401).json({
                success: false,
                message: "User already registered. Try logging in"
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({ name, email, password: encryptedPassword })
        await newUser.save()

        const token = generateToken(newUser._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//user login
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = generateToken(user._id)

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "Wrong Credentials",
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

//getting user by id
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        return res.status(200).json({ user })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//getting user resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId
        if(userId){
            const resumes = await Resume.find({ userId })
            return res.status(200).json({ resumes })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
import { json } from "express";
import Resume from "../models/Resume.models.js";
import imageeKit from '../configs/imagekit.js'

// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({ userId, title })

        // return success message
        return res.status(201).json({
            message: 'Resume created successfully',
            resume: newResume
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// controller for deleting a resume
// DELETE: /api/resumes/delete/:id

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId })

        // return success message
        return res.status(200).json({
            message: 'Resume deleted successfully'
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

// controller for getting a single resume by id
// get: /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params

        const resume = await Resume.findOne({ _id: resumeId, userId })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            })
        }

        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// controller for getting updating
// put: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeData, removeBackground, resumeId } = req.body;
        const image = req.file;

        const resumeDataCopy =
            typeof resumeData === "string"
                ? JSON.parse(resumeData)
                : structuredClone(resumeData);

        if (image) {
            try {
                const uploadOptions = {
                    file: image.buffer.toString("base64"),
                    fileName: "resume.png",
                    folder: "user-resumes",
                };

                if (removeBackground === "yes") {
                    uploadOptions.extensions = [
                        {
                            name: "remove-bg",
                            options: {
                                background: "transparent",
                            },
                        },
                    ];
                }

                const response = await imageeKit.files.upload(uploadOptions);
                resumeDataCopy.personal_info.image = response.url;
               } 
            catch (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { returnDocument: "after" }
        );

        return res.status(200).json({
            success: true,
            message: "Saved successfully!",
            resume,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
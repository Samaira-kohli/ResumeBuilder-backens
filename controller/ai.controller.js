import ai from "../configs/openai.js";

//post: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences while highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and only return the improved summary text without options or explanations."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedResponse = response.choices[0].message.content
        return res.status(201).json({ enhancedResponse })
    }
    catch (error) {
        return res.status(400).json({
            message: 'error.message',
        })
    }
}

//post: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences while highlighting key responsibilities and career achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return the text without options or amything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })

        const enhancedResponse = response.choices[0].message.content
        return res.status(201).json({ enhancedResponse })
    }
    catch (error) {
        return res.status(400).json({
            message: 'error.message',
        })
    }
}

//controller for uploading resume to the db
//post: /api/ai/upload-resume

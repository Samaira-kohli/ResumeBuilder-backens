import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.OpenAI,
    baseURL: process.env.baseURL,
});

export default ai
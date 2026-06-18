import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI
        await mongoose.connect(`${uri}/Resume-Builder`)
        console.log("MongoDB Connected Successfully");
    }

    catch (err) {
        console.log("MongoDB Connection Error:", error.message);
    }
}

export default connectDB
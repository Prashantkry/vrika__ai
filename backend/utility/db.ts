import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const mongoUrl = process.env.mongoUrl!

export const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUrl)
        console.log("Database connected")
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const mongoUrl = process.env.mongoUrl!;
const summarizeAPI = process.env.summarizeAPI!;
const token = process.env.token!;
const client = new MongoClient(mongoUrl);

interface SummaryResponse {
    summary_text: string;
}
interface TextEntry {
    textSummary: string;
    date: string;
}

interface UserDocument {
    email: string;
    textEntries: TextEntry[];
}

if (!mongoUrl || !summarizeAPI || !token) {
    throw new Error("Missing environment variables");
}

export const TextToText = async (req: Request, res: Response) => {
    console.log("Summarizing text api  called");
    const { textData, email } = req.body;

    if (!textData || !email) {
        return res.status(400).json({ message: "Email and textData are required" });
    }
    const data = {
        "inputs": textData
    };
    // ! Summarize the text
    const response = await fetch(summarizeAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        return res.status(response.status).json({ message: "Failed to summarize text", error: errorResponse });
    }


    const dataText = await response.json() as SummaryResponse[];
    const textSummary = dataText[0].summary_text;

    try {
        await client.connect();
        const db = client.db('VrikaAI');
        const collectionTextData = db.collection<UserDocument>('TextToText');
        const currentTime = new Date().toLocaleString();

        const userFound = await collectionTextData.findOne({ email });

        if (!userFound) {
            await collectionTextData.insertOne({
                email,
                textEntries: [{ textSummary, date: currentTime }]
            });
        } else {
            await collectionTextData.updateOne(
                { email },
                { $push: { textEntries: { textSummary, date: currentTime } as TextEntry } },
                { upsert: true }
            );
            
        }

        res.json({ message: "Text saved successfully", status: 200, textSummary });

    } catch (error) {
        console.error("Error saving text data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ! Get last 3 summaries
export const getPreviousSummaries = async (req: Request, res: Response) => {
    const email = req.headers.email as string;
    try {
        await client.connect();
        const db = client.db('VrikaAI');
        const collectionTextData = db.collection('TextToText');

        const userFound = await collectionTextData.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: "No previous summaries found" });
        }

        const textEntries = userFound.textEntries.slice(0, 3);
        // console.log("Previous Summaries:", textEntries);
        res.json({ previousSummaries: textEntries });
    } catch (error) {
        console.error("Error fetching previous summaries:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
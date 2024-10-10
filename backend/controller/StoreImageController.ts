// controllers/imageController.ts
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import ImageStoreDatabase from '../model/GeneratedImage';
import { UserModel } from '../model/userModel';

const DataBase = 'VrikaAI'
const userCollection = 'signUpData'

// Function to handle image submission
export const saveImageDatabase = async (req: Request, res: Response) => {
    const { email, imageUrl, prompts } = req.body;
    const imageData = imageUrl
    if (!email || !imageData || typeof email !== 'string' || typeof imageData !== 'string' || !prompts) {
        return res.status(400).json({ message: 'Email and image data are required.' });
    }
    try {
        const newImage = new ImageStoreDatabase({
            email,
            imageData,
            prompts,
            generatedAt: new Date(),
        });
        await newImage.save();
        // credit --
        await UserModel.findOneAndUpdate(
            { email },
            { $inc: { credits: -1 } },
            { new: true }
        );
        return res.status(201).json({ message: 'Image saved successfully.', image: newImage });
    } catch (error) {
        console.error('Error saving image:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Function to get all generated images
export const getAllGeneratedImages = async (req: Request, res: Response) => {
    const { email } = req.headers;
    const database = "VrikaAI"
    const ImageCollection = "generatedImages"
    const client = new MongoClient(process.env.mongoUrl!);
    await client.connect();
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        const generatedImages = await (await client.connect()).db(database).collection(ImageCollection).find({ email }).toArray();
        return res.status(200).json({ message: 'Images found.', generatedImages });
    } catch (error) {
        console.error('Error getting images:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
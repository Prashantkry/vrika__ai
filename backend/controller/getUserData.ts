import { MongoClient } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const mongoUrl = process.env.mongoUrl!;
export const getUserData = async (req: express.Request, res: express.Response) => {
    const { email } = req.headers;
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const database = client.db('VrikaAI');
    const userCollection = 'signUpData';

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await database.collection(userCollection).findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const userData = {
            name: user.name,
            email: user.email,
            phoneNo: user.phoneNo,
            credits: user.credits,
            plan: user.plan,
            cardDetails: user.cardDetails,
        }
        return res.status(200).json({ message: 'User found.', userData });
    } catch (error) {
        console.error('Error getting user data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
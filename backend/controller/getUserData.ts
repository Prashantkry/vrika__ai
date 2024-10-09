import { MongoClient } from 'mongodb';
import express, { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const mongoUrl = process.env.mongoUrl!;

const client = new MongoClient(mongoUrl);
const database = client.db('VrikaAI');
const userCollection = 'signUpData';

// ! To get the user data
export const getUserData = async (req: express.Request, res: express.Response) => {
    const { email } = req.headers;
    await client.connect();

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
            planExpire:user.planExpire
        }
        return res.status(200).json({ message: 'User found.', userData });
    } catch (error) {
        console.error('Error getting user data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// ! To update the user data
export const updateUserData = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("updateUserData api called");
    const { email } = req.headers;
    console.log("email:", email);
    const { updatedUserData } = req.body;
    const { name, phone, cardDetails } = updatedUserData;
    if (!cardDetails) {
        return res.status(400).json({ message: 'Card details are required.' });
    }

    const { cardHolderName, cardNumber, expiryDate, cvv } = cardDetails;

    console.log("name:", name, "phoneNo:", phone,
        "cardHolderName:", cardHolderName,
        "cardNumber:", cardNumber,
        "expiryDate:", expiryDate,
        "cvv:", cvv);

    try {
        await client.connect();
        const user = await database.collection(userCollection).findOne({ email });
        console.log("user:", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const updateRes = await database.collection(userCollection).updateOne(
            { email },
            {
                $set: {
                    name,
                    phoneNo: phone,
                    cardDetails: {
                        cardHolderName,
                        cardNumber,
                        expiryDate,
                        cvv,
                    },
                },
            }
        );
        console.log("updateRes:", updateRes);
        if (!updateRes) {
            return res.status(500).json({ message: 'Error updating user data.' });
        }
        return res.status(200).json({ message: 'User data updated successfully.' });
    } catch (error) {
        console.error('Error updating user data:', error);
        return res.status(500).json({ message: 'Internal server error.' }).end();
    }
};

// ! To upload the profile picture of the user
export const uploadProfilePicAPI = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("uploadProfilePic api called");
    const { email } = req.headers;
    const { profilePicData } = req.body;
    if (!profilePicData || typeof profilePicData !== 'string' || profilePicData.length === 0 || profilePicData === '' || profilePicData === null || profilePicData === undefined) {
        return res.status(400).json({ message: 'Profile picture is required.' });
    }

    try {
        await client.connect();
        const user = await database.collection(userCollection).findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const updateRes = await database.collection(userCollection).updateOne(
            { email },
            {
                $set: {
                    pic: profilePicData,
                },
            }
        );
        console.log("updateRes:", updateRes);
        if (!updateRes) {
            return res.status(500).json({ message: 'Error updating profile picture.' });
        }
        return res.status(200).json({ message: 'Profile picture updated successfully.' });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        return res.status(500).json({ message: 'Internal server error.' }).end();
    }
};

//  ! Get profile picture of the user
export const getProfilePicAPI = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("getProfilePic api called");
    const { email } = req.headers;
    await client.connect();

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await database.collection(userCollection).findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const pic = user.pic;
        return res.status(200).json({ message: 'Profile picture found.', pic });
    } catch (error) {
        console.error('Error getting profile picture:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
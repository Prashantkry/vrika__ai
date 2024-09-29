import express from 'express';
import { UserModel } from '../model/userModel';  // Import the User model
import { comparePassword } from '../utility/encryptPassword';  // Import utility function to compare hashed passwords
import { signInData } from '../utility/interface';  // Import the sign-in data interface
import jwt from 'jsonwebtoken'; // Import JWT

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your actual secret

export const signIn = async (req: express.Request, res: express.Response) => {
    const { email, password }: signInData = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or password is missing" });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.password) {
            return res.status(404).json({ message: "No user found or incorrect password" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // **Highlight: Create a token payload and sign the token**
        const tokenPayload = { id: user._id, email: user.email };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        // Respond with token
        return res.status(200).json({ message: "Sign in successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};

import express from 'express';
import { UserModel } from '../model/userModel';  // Import the User model
import { comparePassword } from '../utility/encryptPassword';  // Import utility function to compare hashed passwords
import { signInData } from '../utility/interface';  // Import the sign-in data interface

export const signIn = async (req: express.Request, res: express.Response) => {
    // Extract email and password from the request body
    const { email, password }: signInData = req.body;
    console.log(email, password);

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email or password is missing" }).end();  // Respond with 400 (Bad Request) if missing
    }

    try {
        // Check if the user with the given email exists
        const user = await UserModel.findOne({ email });
        if (!user || !user.password) {
            // Respond with 404 (Not Found) if user doesn't exist or no password is set
            return res.status(404).json({ message: "No user found or incorrect password" }).end();
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await comparePassword(password, user.password);
        console.log(isPasswordCorrect);

        // If password is incorrect, respond with an error
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" }).end();  // 401 means unauthorized
        }

        // If everything is correct, respond with a success message
        return res.status(200).json({ message: "Sign in successful" }).end();
    } catch (error) {
        // Catch any unexpected errors and respond with a 500 (Internal Server Error)
        console.error(error);
        return res.status(500).json({ message: "Server error, please try again later" }).end();
    }
};

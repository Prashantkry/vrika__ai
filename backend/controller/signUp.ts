import { Request, Response } from 'express';
import { userProfile } from '../utility/interface';
import { UserModel } from '../model/userModel';
import { hashPassword } from '../utility/encryptPassword';

export const signUpData = async (req: Request, res: Response): Promise<Response> => {
    console.log("sign up API triggered");

    let { name, email, phoneNo, password }: userProfile = req.body;
    console.log(name, email, phoneNo, password);

    if (!name || !email || !phoneNo || !password) {
        return res.status(400).json({ message: "Name, email, phone number, and password are required." });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        return res.status(409).json({ message: "User already exists. Please sign in." });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new UserModel({
        pic: "",
        name,
        email,
        phoneNo,
        password: hashedPassword,        
    });
    await user.save();
    return res.status(201).json({ message: "You are signed up successfully!" });
};

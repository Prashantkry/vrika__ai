import express from 'express';
import { UserModel } from '../model/userModel';
import { comparePassword } from '../utility/encryptPassword';
import { signInData } from '../utility/interface';
export const signIn = async (req: express.Request, res: express.Response) => {
    const { email, password }: signInData = req.body;
    console.log(email, password)

    if (!email || !password) {
        return res.status(500).json({ message: "email or password is missing" }).end()
    }
    const user = await UserModel.findOne({ email })
    if (!user || !user.password) {
        return res.status(400).json({ message: "No user found or incorrect password" }).end()
    }
    const isPassword = await comparePassword(password, user.password)
    console.log(isPassword)
    if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password" }).end()
    }
    return res.status(200).json({ message: "Sign in successful" }).end()
}   

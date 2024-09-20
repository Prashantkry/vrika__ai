import express, { Response } from 'express'
import { userProfile } from '../utility/interface'
import { UserModel } from '../model/userModel'
import { hashPassword } from '../utility/encryptPassword'

export const signUpData = async (req: express.Request, res: express.Response): Promise<Response> => {
    console.log("sign up api triggered")
    let { name, email, phoneNo, password, pic }: userProfile = req.body
    console.log(name, email, phoneNo, password, pic)
    if (!name || !email || !phoneNo || !password) {
        return res.status(500).json({ message: "email or password is missing" })
    }
    if (pic === "" || pic === undefined) {
        pic = name[0];
    }
    const hashedPassword = await hashPassword(password);
    const user = new UserModel({ name, email, password: hashedPassword, pic })
    const userExist = await UserModel.findOne({ email })
    if (userExist) {
        console.log("triifggg")
        return res.status(500).json({ message: "User already exist Sign In" }).end()
    }
    await user.save()
    return res.status(200).json({ message: "You are signed up successfully" }).end()
}
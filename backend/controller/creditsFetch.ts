import express, { Response } from 'express'
import { MongoClient } from 'mongodb'
import dotenv from "dotenv"
dotenv.config()
const mongoUrl = process.env.mongoUrl!

const database = 'VrikaAI'
const collectionUser = 'signUpData'
export const creditsFetch = async (req: express.Request, res: express.Response): Promise<Response> => {
    const { email } = req.headers
    if (!email) return res.status(500).json({ message: "Provide user email" }).end()
    const client = new MongoClient(mongoUrl)
    try {
        const userData = await (await client.connect()).db(database).collection(collectionUser).findOne({ email })
        if (!userData) return res.status(500).json({ message: "Provide user email" }).end()
        const credits = userData.credits
        return res.status(200).json({ message: "Credits", credits }).end()
    } catch (err) {
        return res.status(200).json({ message: "credits not decreased" }).end()
    }
}
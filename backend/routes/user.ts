import express from 'express'
import { signUpData } from '../controller/signUp'
import { signIn } from '../controller/signIn';

const signUpRoutes = express.Router()
const signInRoutes = express.Router()

signUpRoutes.post("/", signUpData)

signInRoutes.post("/", signIn)

export default signUpRoutes
export { signInRoutes }
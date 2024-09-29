import express from 'express'
import { signUpData } from '../controller/signUp'
import { signIn } from '../controller/signIn';
import { getUserData } from '../controller/getUserData';

const signUpRoutes = express.Router()
const signInRoutes = express.Router()
const getUserDataRoutes = express.Router()

signUpRoutes.post("/", signUpData)

signInRoutes.post("/", signIn)

getUserDataRoutes.get("/", getUserData);

export default signUpRoutes
export { signInRoutes, getUserDataRoutes }
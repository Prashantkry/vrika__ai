import express from 'express'
import { signUpData } from '../controller/signUp'
import { signIn } from '../controller/signIn';
import { getProfilePicAPI, getUserData, updateUserData, uploadProfilePicAPI } from '../controller/getUserData';
import { get } from 'http';

const signUpRoutes = express.Router()
const signInRoutes = express.Router()
const getUserDataRoutes = express.Router()
const uploadProfilePic = express.Router()
const getProfilePicRoute = express.Router()

signUpRoutes.post("/", signUpData)

signInRoutes.post("/", signIn)

getUserDataRoutes.get("/", getUserData);

getUserDataRoutes.put("/", updateUserData);

uploadProfilePic.put("/", uploadProfilePicAPI);

getProfilePicRoute.get("/", getProfilePicAPI);

export default signUpRoutes
export { signInRoutes, getUserDataRoutes, uploadProfilePic, getProfilePicRoute }
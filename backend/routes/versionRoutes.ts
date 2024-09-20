import express from 'express'
import signUpRoutes, { signInRoutes } from './user'
import contactRoutes from './contactRoutes'
import GenerateArtRouter from './GenerateArtroutes'

const versionRoutes = express.Router()

versionRoutes.use("/GenerateArt", GenerateArtRouter)

versionRoutes.use("/signUp", signUpRoutes)
versionRoutes.use("/signIn", signInRoutes)

versionRoutes.use("/contact", contactRoutes)

export default versionRoutes
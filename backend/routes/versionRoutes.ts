import express from 'express'
import signUpRoutes, { getUserDataRoutes, signInRoutes } from './user'
import contactRoutes from './contactRoutes'
import GenerateArtRouter from './GenerateArtroutes'
import ImageStoreDatabaseRouter from './ImageStoreDatabase'

const versionRoutes = express.Router()

versionRoutes.use("/GenerateArt", GenerateArtRouter)

versionRoutes.use("/signUp", signUpRoutes)
versionRoutes.use("/signIn", signInRoutes)
versionRoutes.use("/getUserData", getUserDataRoutes)

versionRoutes.use("/contact", contactRoutes)

versionRoutes.use("/ImageStoreDatabase", ImageStoreDatabaseRouter)

export default versionRoutes
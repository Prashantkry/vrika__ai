import express from 'express'
import signUpRoutes, { getProfilePicRoute, getUserDataRoutes, signInRoutes, uploadProfilePic } from './user'
import contactRoutes from './contactRoutes'
import GenerateArtRouter from './GenerateArtroutes'
import ImageStoreDatabaseRouter from './ImageStoreDatabase'
import paymentRoutes from './paymentRoutes'
import creditsRoutes from './creditsRoutes'

const versionRoutes = express.Router()

versionRoutes.use("/GenerateArt", GenerateArtRouter)

versionRoutes.use("/signUp", signUpRoutes)
versionRoutes.use("/signIn", signInRoutes)
versionRoutes.use("/getOrUpdateUserData", getUserDataRoutes)
versionRoutes.use("/uploadProfilePicRoutes", uploadProfilePic)
versionRoutes.use("/getProfilePic", getProfilePicRoute)

versionRoutes.use("/contact", contactRoutes)

versionRoutes.use("/ImageStoreDatabase", ImageStoreDatabaseRouter)

versionRoutes.use("/payment", paymentRoutes);

versionRoutes.use("/creditsFetch", creditsRoutes)

export default versionRoutes
import express from 'express'
import { creditsFetch } from '../controller/creditsFetch'
const creditsRoutes = express.Router()

creditsRoutes.get('/', creditsFetch)

export default creditsRoutes
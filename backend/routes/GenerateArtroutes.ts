import { GenerateArt } from "../controller/GenerateImage";
import express from 'express';

const GenerateArtRouter = express.Router();

GenerateArtRouter.post('/', GenerateArt);

export default GenerateArtRouter;

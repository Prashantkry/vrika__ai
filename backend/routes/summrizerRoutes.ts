import express from 'express';
import { TextToText, getPreviousSummaries } from '../controller/summarizer';

const summarizerRouter = express.Router();

summarizerRouter.post('/', TextToText);
summarizerRouter.get('/', getPreviousSummaries);

export default summarizerRouter;

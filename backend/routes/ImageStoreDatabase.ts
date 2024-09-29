import express from 'express';
import { getAllGeneratedImages, saveImageDatabase } from '../controller/StoreImageController';

const ImageStoreDatabaseRouter = express.Router();

ImageStoreDatabaseRouter.post('/', saveImageDatabase);
ImageStoreDatabaseRouter.get('/', getAllGeneratedImages);

export default ImageStoreDatabaseRouter;
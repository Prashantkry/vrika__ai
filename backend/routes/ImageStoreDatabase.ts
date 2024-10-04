import express from 'express';
import { getAllGeneratedImages, saveImageDatabase } from '../controller/StoreImageController';
import { Transaction } from 'mongodb';

const ImageStoreDatabaseRouter = express.Router();

ImageStoreDatabaseRouter.post('/', saveImageDatabase);
ImageStoreDatabaseRouter.get('/', getAllGeneratedImages);
ImageStoreDatabaseRouter.delete('/', getAllGeneratedImages);

export default ImageStoreDatabaseRouter;


const payData = {
    productId: "123",
    productName: "product1",
    productPrice: 100,
    productQuantityType:{
        sm:2,
        lg:1,
        md:0
    },
    totalPrice: 200,
    TransactionId: "123456",
}
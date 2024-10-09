import express from 'express';
import { handleWebhook } from '../controller/webhook';

const paymentRoutes = express.Router();

paymentRoutes.post('/', handleWebhook);

export default paymentRoutes;
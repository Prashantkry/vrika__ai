import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controller/webhook';

const paymentRoutes = express.Router();

paymentRoutes.post('/', createCheckoutSession);
paymentRoutes.post('/webhook', handleWebhook);

export default paymentRoutes;
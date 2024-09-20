import { contactBackend } from "../controller/contact";
import express from "express";

const contactRoutes = express.Router();
contactRoutes.post("/", contactBackend);

export default contactRoutes;
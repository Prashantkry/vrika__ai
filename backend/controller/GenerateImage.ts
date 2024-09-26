import dotenv from 'dotenv';
import express from 'express';
import sharp from 'sharp'; 
import { v4 as uuidv4 } from 'uuid'; 

dotenv.config();
const token: string = process.env.token!;

interface GenerateArtRequest {
    inputs: string;
}

export const GenerateArt = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    console.log("API triggered for image generation");
    const { inputs }: GenerateArtRequest = req.body;
    if (!inputs) {
        return res.status(400).json({ error: 'Inputs are required' });
    }

    const taskId = uuidv4();

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/markury/breaking-bad-flux', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ inputs }),
        });
        if (!response.ok) {
            return res.status(500).json({ error: `Failed to fetch image: ${response.statusText}` });
        }

        // Convert response to buffer
        const arrayBuffer = await response.arrayBuffer();
        const originalBuffer = Buffer.from(arrayBuffer); 
        if (!originalBuffer || originalBuffer.length === 0) {
            return res.status(500).json({ error: 'Received an empty image buffer' });
        }
        
        // Resize images using sharp
        const mediumBuffer = await sharp(originalBuffer).resize(800, 800).toBuffer();
        const smallBuffer = await sharp(originalBuffer).resize(400, 400).toBuffer();

        // Convert to Base64
        const originalBase64 = originalBuffer.toString('base64');
        const mediumBase64 = mediumBuffer.toString('base64');
        const smallBase64 = smallBuffer.toString('base64');

        return res.status(200).json({
            message: 'Image generation completed',
            taskId,
            images: {
                original: originalBase64,
                medium: mediumBase64,
                small: smallBase64,
            },
        });
    } catch (error:any) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Image generation failed: ' + error.message });
    }
};
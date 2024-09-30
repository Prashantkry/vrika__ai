import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const token: string = process.env.token!;
const ImageGenerationAPI = process.env.ImageGenerationAPI!;

interface GenerateArtRequest {
    inputs: string;
}

export const maxDuration = 59;

export const GenerateArt = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    console.log("API triggered for image generation");
    const { inputs }: GenerateArtRequest = req.body;
    if (!inputs) {
        return res.status(400).json({ error: 'Inputs are required' });
    }

    const taskId = uuidv4();

    try {
        const response = await fetch(ImageGenerationAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ inputs }),
        });
        if (!response.ok) return res.status(500).json({ error: `Failed to fetch image: ${response.statusText}` });

        // Convert response to buffer
        const imageBuffer = Buffer.from(await response.arrayBuffer());
        if (!imageBuffer || imageBuffer.length === 0)
            return res.status(500).json({ error: 'Received an empty image buffer' });

        console.log("Image generation completed");
        return res.status(200).json({
            message: 'Image generation completed',
            taskId,
            images: imageBuffer.toString('base64')
        });
    } catch (error: any) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Image generation failed: ' + error.message });
    }
};
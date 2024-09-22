import dotenv from 'dotenv';
import express from 'express';
import sharp from 'sharp'; 

dotenv.config();
const token: string = process.env.token!;

interface GenerateArtRequest {
    inputs: string;
}

export const GenerateArt = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    console.log("API triggered for image generation");
    // console.log("token is ", token);
    const input: GenerateArtRequest = req.body.inputs;
    // console.log("input is ", input);
    
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/markury/breaking-bad-flux', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ inputs: input }),
        });

        // const blob = await response.blob();
        const arrayBuffer = await response.arrayBuffer();
        const originalBuffer = Buffer.from(arrayBuffer); 
        if (!originalBuffer || originalBuffer.length === 0) {
            return res.status(400).json({ error: 'Received an empty image buffer' });
        }
        
        // Resize images
        const base64String = originalBuffer.toString('base64');
        const mediumBuffer = await sharp(originalBuffer).resize(800, 800).toBuffer();
        const smallBuffer = await sharp(originalBuffer).resize(400, 400).toBuffer();

        const mediumBase64 = mediumBuffer.toString('base64');
        const smallBase64 = smallBuffer.toString('base64');

        return res.status(200).json({
            originalImageUrl: `data:image/jpeg;base64,${base64String}`,
            mediumImageUrl: `data:image/jpeg;base64,${mediumBase64}`,
            smallImageUrl: `data:image/jpeg;base64,${smallBase64}`
        }).end();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Something went wrong' }).end();
    }
}

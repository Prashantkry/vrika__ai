import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const token: string = process.env.token!;

interface GenerateArtRequest {
    inputs: string;
}

export const GenerateArt = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    console.log("API triggered for image generation");
    console.log("token is ", token);
    // const input = "wolf looking king type dangerous view real 4k 8k";
    const input: GenerateArtRequest = req.body.inputs;
    console.log("input is ", input);
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/markury/breaking-bad-flux', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ inputs: input }),
        });
        
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString('base64');

        return res.status(200).json({ imageUrl: `data:image/jpeg;base64,${base64String}` }).end();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Something went wrong' }).end();
    }
}

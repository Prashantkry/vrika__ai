// ! Image Generated data
import mongoose, { Document, Schema } from 'mongoose';

interface IImage extends Document {
    email: string;
    imageData: string;
    prompts: string;
    generatedAt: Date;
}

const imageSchema: Schema = new Schema({
    email: { type: String, required: true },
    imageData: { type: String, required: true },
    prompts: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now },
}, { collection: 'generatedImages' });

const ImageStoreDatabase = mongoose.model<IImage>('Image', imageSchema);

export default ImageStoreDatabase;

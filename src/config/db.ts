import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async () => {
    dotenv.config();

    const URI: string = process.env.ATLAS_URI as string;

    try {
        await mongoose.connect(URI);
        console.log('Successfully connected to the database!');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

export default connectDB;
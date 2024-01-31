import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default function connectDB() {
    dotenv.config();

    const URI: string = process.env.ATLAS_URI as string;

    try {
        mongoose.connect(URI);
    } catch (err: any) {
        console.log(err.message);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.once('open', () => {
        console.log('Successfully connected to the database!');
    });

    dbConnection.on('error', (err) => {
        console.error('Connection error:', err);
    });
}
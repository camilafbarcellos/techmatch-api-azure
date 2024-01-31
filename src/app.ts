import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app: Express = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes

export default app;

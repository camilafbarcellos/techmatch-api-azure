import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import { questions } from './questions'

const app: Express = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use('/questions', questions);

export default app;

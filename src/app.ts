import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import { questions } from './modules/questions'
import { auth } from './modules/auth';

const app: Express = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use('/questions', questions);
app.use('/auth', auth);

export default app;

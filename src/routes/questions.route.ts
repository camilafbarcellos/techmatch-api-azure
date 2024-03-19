import express from 'express';
import * as questionsController from '../controllers/questions.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const questionsRoute = express.Router();

questionsRoute.get('/', questionsController.getAll);
questionsRoute.get('/:id', questionsController.get);
questionsRoute.post('/', authMiddleware, questionsController.create);
questionsRoute.put('/:id', authMiddleware, questionsController.update);
questionsRoute.delete('/:id', authMiddleware, questionsController.remove);

export default questionsRoute;
import express from 'express';
import * as questionsController from '../controllers/questions.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const questionsRoute = express.Router();

questionsRoute.route('/questions')
    .get(questionsController.getAll)
    .post(authMiddleware, questionsController.create);

questionsRoute.route('/questions/:id')
    .get(questionsController.get)
    .put(authMiddleware, questionsController.update)
    .delete(authMiddleware, questionsController.remove);

export default questionsRoute;
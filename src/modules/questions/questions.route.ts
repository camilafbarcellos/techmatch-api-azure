import express from 'express';
import * as questionsController from './questions.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', questionsController.getAll);
router.get('/:id', questionsController.get);
router.post('/', authMiddleware, questionsController.create);
router.put('/:id', authMiddleware, questionsController.update);
router.delete('/:id', authMiddleware, questionsController.remove);

export default router;
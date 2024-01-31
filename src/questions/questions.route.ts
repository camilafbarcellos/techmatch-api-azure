import express from 'express';
import * as questionsController from './questions.controller';

const router = express.Router();

router.get('/', questionsController.getAll);

router.get('/:id', questionsController.get);

router.post('/', questionsController.create);

router.put('/:id', questionsController.update);

router.delete('/:id', questionsController.remove);

export default router;
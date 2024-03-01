import { Request, Response } from 'express';
import * as questionsService from './questions.service';

async function getAll(req: Request, res: Response) {
  try {
    const questions = await questionsService.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error while questions:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function get(req: Request, res: Response) {
  try {
    const questionId = req.params.id;
    const question = await questionsService.findOne(questionId);
    if (!question) {
      res.status(404).json({ message: 'Question not found' });
    } else {
      res.status(200).json(question);
    }
  } catch (error) {
    console.error('Error while getting the question:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function create(req: Request, res: Response) {
  try {
    const newQuestion = req.body;
    const createdQuestion = await questionsService.create(newQuestion);
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error('Error while creating the question:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function update(req: Request, res: Response) {
  try {
    const questionId = req.params.id;
    const updatedQuestionData = req.body;
    const updatedQuestion = await questionsService.update(questionId, updatedQuestionData);
    if (!updatedQuestion) {
      res.status(404).json({ message: 'Question not found' });
    } else {
      res.status(200).json(updatedQuestion);
    }
  } catch (error) {
    console.error('Error while updating the question:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function remove(req: Request, res: Response) {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await questionsService.remove(questionId);
    if (!deletedQuestion) {
      res.status(404).json({ message: 'Question not found' });
    } else {
      res.status(204);
    }
  } catch (error) {
    console.error('Error removing question:', error);
    res.status(500).send('Internal Server Error');
  }
}

export { getAll, get, create, update, remove };
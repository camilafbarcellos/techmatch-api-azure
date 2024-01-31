import { Request, Response, NextFunction } from 'express';
import * as questionsService from './questions.service';

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await questionsService.findAll());
    } catch (err: any) {
      console.error(`Error while getting the question:s`, err.message);
      next(err);
    }
  }

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await questionsService.findOne(req.params.id));
  } catch (err: any) {
    console.error(`Error while getting the question:`, err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await questionsService.create(req.body));
    
  } catch (err: any) {
    console.error(`Error while creating the question`, err.message);
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await questionsService.update(req.params.id, req.body));
  } catch (err: any) {
    console.error(`Error while updating the question`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await questionsService.remove(req.params.id));
  } catch (err: any) {
    console.error(`Error while deleting the question`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
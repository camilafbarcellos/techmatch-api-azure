import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { CreateQuestionDTO } from '../../src/dtos/questions/createQuestion.dto';
import { UpdateQuestionDTO } from '../../src/dtos/questions/updateQuestion.dto';

dotenv.config();

export const questionId: ObjectId = new mongoose.Types.ObjectId();

export const questionInput: CreateQuestionDTO = {
    category: 'Desenvolvimento',
    question: 'Enunciado'
};

export const invalidQuestionInput: Partial<CreateQuestionDTO> = {
    question: 'Enunciado'
};

export const updateQuestionInput: UpdateQuestionDTO = {
    question: 'Enunciado alterado'
};

export const invalidUpdateCategoryInput: UpdateQuestionDTO = {
    category: 'Categoria inválida'
};

export const questionPayload: CreateQuestionDTO & {_id: ObjectId} = {
    _id: questionId,
    category: 'Desenvolvimento',
    question: 'Enunciado'
};

export const updateQuestionPayload: UpdateQuestionDTO & {_id: ObjectId} = {
    _id: questionId,
    category: 'Desenvolvimento',
    question: 'Enunciado alterado'
};
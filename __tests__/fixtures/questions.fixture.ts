import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { IQuestion } from '../../src/models/question.model';

dotenv.config();

export const questionId: ObjectId = new mongoose.Types.ObjectId();

export const questionInput: Partial<IQuestion> = {
    category: 'Desenvolvimento',
    question: 'Enunciado'
};

export const invalidQuestionInput: Partial<IQuestion> = {
    question: 'Enunciado'
};

export const updateQuestionInput: Partial<IQuestion> = {
    question: 'Enunciado alterado'
};

export const updateInvalidCategoryInput: Partial<IQuestion> = {
    category: 'Categoria inválida'
};

export const questionPayload: Partial<IQuestion> = {
    _id: questionId,
    category: 'Desenvolvimento',
    question: 'Enunciado'
};

export const updateQuestionPayload: Partial<IQuestion> = {
    _id: questionId,
    category: 'Desenvolvimento',
    question: 'Enunciado alterado'
};
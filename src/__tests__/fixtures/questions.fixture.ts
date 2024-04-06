import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { IQuestion } from '../../models/question.model';
import IAdminUser from '../../utils/adminUser';

dotenv.config();

export const questionId = new mongoose.Types.ObjectId().toString();

export const questionInput: Partial<IQuestion> = {
    category: 'Desenvolvimento',
    question: 'Enunciado'
};

export const updateQuestionInput: Partial<IQuestion> = {
    question: 'Enunciado alterado'
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

export const adminInput: IAdminUser = {
    user: process.env.ADMIN_USER as string,
    password: process.env.ADMIN_PASSWORD as string
};
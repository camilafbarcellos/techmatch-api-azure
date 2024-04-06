import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../app';
import { adminInput } from '../fixtures/auth.fixture';
import {
    invalidQuestionInput,
    questionInput, questionPayload,
    updateInvalidCategoryInput,
    updateQuestionInput, updateQuestionPayload
} from '../fixtures/questions.fixture';

dotenv.config();

let token: string;
let questionId: ObjectId;
const invalidQuestionId: ObjectId = new mongoose.Types.ObjectId();

/* Connecting to the database, authenticating and getting a JWT token before the tests */
beforeAll(async () => {
    const res = await request(app).post('/auth').send(adminInput);
    token = res.body.accessToken;
    await mongoose.connect(process.env.ATLAS_URI as string);
});

/* Closing database connection after the tests */
afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /questions', () => {
    it('should return all questions', async () => {
        const res = await request(app).get('/questions');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('POST /questions', () => {
    it('should create a question and return it', async () => {
        const res = await request(app)
            .post('/questions')
            .send(questionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ ...questionPayload, _id: expect.any(String) });
        questionId = res.body._id;
    });

    it('should fail operation and return a bad request message', async () => {
        const res = await request(app)
            .post('/questions')
            .send(invalidQuestionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
    });

    it('should fail operation and return an unauthorized message', async () => {
        const res = await request(app)
            .post('/questions')
            .send(questionInput)
            .set('Authorization', `Bearer invalidToken`);
        expect(res.statusCode).toBe(401);
    });

    it('should fail operation and return a forbidden message', async () => {
        const res = await request(app)
            .post('/questions')
            .send(questionInput);
        expect(res.statusCode).toBe(403);
    });
});

describe('GET /questions/:id', () => {
    it('should return a question', async () => {
        const res = await request(app)
            .get(`/questions/${questionId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ ...questionPayload, _id: questionId });
    });

    it('should fail operation and return a not found message', async () => {
        const res = await request(app)
            .get(`/questions/${invalidQuestionId}`);
        expect(res.statusCode).toBe(404);
    });
});

describe('PUT /questions/:id', () => {
    it('should update a question and return it', async () => {
        const res = await request(app)
            .put(`/questions/${questionId}`)
            .send(updateQuestionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ ...updateQuestionPayload, _id: questionId });
    });

    it('should fail operation and return a not found message', async () => {
        const res = await request(app)
            .put(`/questions/${invalidQuestionId}`)
            .send(updateQuestionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });

    it('should fail operation and return a bad request message', async () => {
        const res = await request(app)
            .put(`/questions/${questionId}`)
            .send(updateInvalidCategoryInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
    });

    it('should fail operation and return an unauthorized message', async () => {
        const res = await request(app)
            .put(`/questions/${questionId}`)
            .send(updateQuestionInput)
            .set('Authorization', `Bearer invalidToken`);
        expect(res.statusCode).toBe(401);
    });

    it('should fail operation and return a forbidden message', async () => {
        const res = await request(app)
            .put(`/questions/${questionId}`)
            .send(updateQuestionInput)
        expect(res.statusCode).toBe(403);
    });
});

describe('DELETE /questions/:id', () => {
    it('should delete a question', async () => {
        const res = await request(app)
            .delete(`/questions/${questionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

    it('should fail operation and return a not found message', async () => {
        const res = await request(app)
            .delete(`/questions/${invalidQuestionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });

    it('should fail operation and return an unauthorized message', async () => {
        const res = await request(app)
            .delete(`/questions/${questionId}`)
            .set('Authorization', `Bearer invalidToken`);
        expect(res.statusCode).toBe(401);
    });

    it('should fail operation and return a forbidden message', async () => {
        const res = await request(app)
            .delete(`/questions/${questionId}`)
        expect(res.statusCode).toBe(403);
    });
});
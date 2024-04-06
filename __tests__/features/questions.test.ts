import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../src/app';
import { adminInput } from '../fixtures/auth.fixture';
import {
    invalidQuestionInput,
    questionInput, questionPayload,
    updateInvalidCategoryInput,
    updateQuestionInput, updateQuestionPayload
} from '../fixtures/questions.fixture';

dotenv.config();

let mongoServer: MongoMemoryServer;
let token: string;
let questionId: ObjectId;
const invalidQuestionId: ObjectId = new mongoose.Types.ObjectId();

/* Connecting to the database, authenticating and getting a JWT token before the tests */
beforeAll(async () => {
    const res = await request(app).post('/auth').send(adminInput);
    token = res.body.accessToken;

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

/* Closing database connection after the tests */
afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('POST /questions', () => {
    describe('given question is valid', () => {
        it('should create a question and return it (201)', async () => {
            const res = await request(app)
                .post('/questions')
                .send(questionInput)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual({ ...questionPayload, _id: expect.any(String) });
            questionId = res.body._id;
        });
    });

    describe('given question is invalid', () => {
        it('should return a bad request status (400)', async () => {
            const res = await request(app)
                .post('/questions')
                .send(invalidQuestionInput)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('given JWT token is invalid', () => {
        it('should return an unauthorized status (401)', async () => {
            const res = await request(app)
                .post('/questions')
                .send(questionInput)
                .set('Authorization', `Bearer invalidToken`);
            expect(res.statusCode).toBe(401);
        });
    });

    describe('no given JWT token', () => {
        it('should return a forbidden status (403)', async () => {
            const res = await request(app)
                .post('/questions')
                .send(questionInput);
            expect(res.statusCode).toBe(403);
        });
    });
});

describe('GET /questions', () => {
    it('should return all questions (200)', async () => {
        const res = await request(app).get('/questions');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /questions/:id', () => {
    describe('given question ID is valid', () => {
        it('should return a question (200)', async () => {
            const res = await request(app)
                .get(`/questions/${questionId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ ...questionPayload, _id: questionId });
        });
    });

    describe('given question ID is invalid', () => {
        it('should return a not found status (404)', async () => {
            const res = await request(app)
                .get(`/questions/${invalidQuestionId}`);
            expect(res.statusCode).toBe(404);
        });
    });
});

describe('PUT /questions/:id', () => {
    describe('given question ID and data are valid', () => {
        it('should update a question and return it (200)', async () => {
            const res = await request(app)
                .put(`/questions/${questionId}`)
                .send(updateQuestionInput)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ ...updateQuestionPayload, _id: questionId });
        });
    });

    describe('given question ID is invalid', () => {
        it('should return a not found status (404)', async () => {
            const res = await request(app)
                .put(`/questions/${invalidQuestionId}`)
                .send(updateQuestionInput)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(404);
        });
    });

    describe('given category question is invalid', () => {
        it('should return a bad request status (400)', async () => {
            const res = await request(app)
                .put(`/questions/${questionId}`)
                .send(updateInvalidCategoryInput)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('given JWT token is invalid', () => {
        it('should return an unauthorized status (401)', async () => {
            const res = await request(app)
                .put(`/questions/${questionId}`)
                .send(updateQuestionInput)
                .set('Authorization', `Bearer invalidToken`);
            expect(res.statusCode).toBe(401);
        });
    });

    describe('no given JWT token', () => {
        it('should return a forbidden status (403)', async () => {
            const res = await request(app)
                .put(`/questions/${questionId}`)
                .send(updateQuestionInput)
            expect(res.statusCode).toBe(403);
        });
    });
});

describe('DELETE /questions/:id', () => {
    describe('given question ID is valid', () => {
        it('should delete a question (204)', async () => {
            const res = await request(app)
                .delete(`/questions/${questionId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(204);
        });
    });

    describe('given question ID is invalid', () => {
        it('should return a not found status (404)', async () => {
            const res = await request(app)
                .delete(`/questions/${invalidQuestionId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(404);
        });
    });

    describe('given JWT token is invalid', () => {
        it('should return an unauthorized status (401)', async () => {
            const res = await request(app)
                .delete(`/questions/${questionId}`)
                .set('Authorization', `Bearer invalidToken`);
            expect(res.statusCode).toBe(401);
        });
    });

    describe('no given JWT token', () => {
        it('should return a forbidden status (403)', async () => {
            const res = await request(app)
                .delete(`/questions/${questionId}`)
            expect(res.statusCode).toBe(403);
        });
    });
});
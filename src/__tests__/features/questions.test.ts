import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../app';
import {
    adminInput, questionInput, questionPayload,
    updateQuestionInput, updateQuestionPayload
} from '../fixtures/questions.fixture';

dotenv.config();

let token: string = '';
let questionId: string = '';

/* Authenticating and getting a JWT token before the tests */
beforeAll(async () => {
    const res = await request(app).post('/auth').send(adminInput);
    token = res.body.accessToken;    
});

/* Connecting to the database before each test */
beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI as string);
});

/* Closing database connection after each test */
afterEach(async () => {
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
    it('should create a question', async () => {
        const res = await request(app)
            .post('/questions')
            .send(questionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ ...questionPayload, _id: expect.any(String) });        
        questionId = res.body._id;
    });
});

describe('GET /questions/:id', () => {
    it('should return a question', async () => {
        const res = await request(app)
            .get(`/questions/${questionId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ ...questionPayload, _id: questionId });        
    });
});



describe('PUT /questions/:id', () => {
    it('should update a question', async () => {
        const res = await request(app)
            .put(`/questions/${questionId}`)
            .send(updateQuestionInput)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ ...updateQuestionPayload, _id: questionId });
    });
});

describe('DELETE /questions/:id', () => {
    it('should delete a question', async () => {
        const res = await request(app)
            .delete(`/questions/${questionId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });
});
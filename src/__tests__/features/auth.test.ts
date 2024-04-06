import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../../app';
import { adminInput, invalidInput } from '../fixtures/auth.fixture';

dotenv.config();

/* Connecting to the database before the tests */
beforeAll(async () => {
    await mongoose.connect(process.env.ATLAS_URI as string);
});

/* Closing database connection after the tests */
afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /auth', () => {
    it('should authenticate and return a JWT token', async () => {
        const res = await request(app)
            .post('/auth')
            .send(adminInput);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ accessToken: expect.any(String) });
    });

    it('should fail authentication and return an unauthorized message', async () => {
        const res = await request(app)
            .post('/auth')
            .send(invalidInput);
        expect(res.statusCode).toBe(401);
    });
});
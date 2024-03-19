import express from 'express';
import * as authController from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.post('/', authController.authenticate);

export default authRoute;

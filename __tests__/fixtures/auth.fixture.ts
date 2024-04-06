import dotenv from 'dotenv';
import { AdminAuthDTO } from '../../src/dtos/auth/adminAuth.dto';

dotenv.config();

export const adminInput: AdminAuthDTO = {
    user: process.env.ADMIN_USER as string,
    password: process.env.ADMIN_PASSWORD as string
};

export const invalidAdminInput: AdminAuthDTO = {
    user: 'Incorrect user',
    password: 'Incorrect password'
};
import dotenv from 'dotenv';
import IAdminUser from '../../src/utils/adminUser';

dotenv.config();

export const adminInput: IAdminUser = {
    user: process.env.ADMIN_USER as string,
    password: process.env.ADMIN_PASSWORD as string
};

export const invalidInput: IAdminUser = {
    user: 'Incorrect user',
    password: 'Incorrect password'
};
import { Request, Response } from 'express';
import { AdminAuthDTO } from '../dtos/auth/adminAuth.dto';
import * as authService from '../services/auth.service';

function authenticate(req: Request, res: Response) {
    try {
        const adminAuth: AdminAuthDTO = req.body;
        const token = authService.authenticate(adminAuth);
        if (!token) {
            res.status(401).json({ message: 'Wrong credentials' });
        } else {
            res.status(200).json({ accessToken: token });
        }
    } catch (error) {
        console.error('Error trying to authenticate:', error);
        res.status(500).send('Internal Server Error');
    }
}

export { authenticate };
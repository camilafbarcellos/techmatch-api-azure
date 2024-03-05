import { Request, Response } from 'express';
import * as authService from './auth.service';

function authenticate(req: Request, res: Response) {
    try {
        const { user, password } = req.body;
        const token = authService.authenticate(user, password);
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
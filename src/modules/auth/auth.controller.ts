import { Request, Response } from 'express';
import * as authService from './auth.service';

function authenticate(req: Request, res: Response) {
    try {
        const { user, password } = req.body;
        const token = authService.authenticate(user, password);
        res.json({ auth: true, jwt: token });
    } catch (error) {
        console.error('Error trying to authenticate:', error);
        res.status(500).send('Internal Server Error');
    }
}

export { authenticate };
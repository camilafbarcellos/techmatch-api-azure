import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const SECRET_KEY = process.env.SECRET_KEY as Secret;
    const token = req.headers.authorization?.replace('Bearer ', '') as string;

    if (!token) {
        res.status(403).send({ message: 'Token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) return res.status(401).send({ message: 'Token unauthorized', info: err });
        next();
    });
};
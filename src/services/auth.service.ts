import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticate(user: string, password: string): string | null {
  const { ADMIN_USER, ADMIN_PASSWORD, SECRET_KEY } = process.env;

  if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ user, role: 'admin' }, SECRET_KEY as Secret, {
      expiresIn: '1h'
    });
    return token;
  } else {
    return null;
  }
}

export { authenticate };
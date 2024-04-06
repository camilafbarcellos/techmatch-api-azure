import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AdminAuthDTO } from '../dtos/auth/adminAuth.dto';

dotenv.config();

function authenticate(data: AdminAuthDTO): string | null {
  const { ADMIN_USER, ADMIN_PASSWORD, SECRET_KEY } = process.env;

  if (data.user === ADMIN_USER && data.password === ADMIN_PASSWORD) {
    const token = jwt.sign({ user: data.user, role: 'admin' }, SECRET_KEY as Secret, {
      expiresIn: '1h'
    });
    return token;
  } else {
    return null;
  }
}

export { authenticate };
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-admin-secret';

export function signAdminToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
}

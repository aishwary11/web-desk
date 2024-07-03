import jwt from 'jsonwebtoken';
import constant from './constant';

export const generateToken = (payload: any) => jwt.sign(payload, constant.token);
export const verifyToken = (payload: string) => jwt.verify(payload, constant.token);

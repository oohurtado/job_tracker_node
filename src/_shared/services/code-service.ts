import { randomBytes } from 'node:crypto';

export const generateCode = (): string => {
    return randomBytes(4).toString('hex').toUpperCase();
};
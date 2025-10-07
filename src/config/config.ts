// Database
export const DB_TYPE: 'postgres' = 'postgres';
export const DB_HOST: string = process.env.DB_HOST || 'localhost';
export const DB_PORT: number = Number(process.env.DB_PORT || '5432');
export const DB_USERNAME: string = process.env.DB_USERNAME || 'user';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || 'password';
export const DB_DATABASE: string = process.env.DB_NAME || 'user';

// JWT
export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
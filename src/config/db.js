import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'user_management',
    password: process.env.DB_PASSWORD || 'password123',
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const checkDatabaseConnection = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        console.log('\x1b[32m%s\x1b[0m', '✅ Database connected successfully!');
        console.log('Connected at:', result.rows[0].now);
        return true;
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Database connection failed!');
        console.error('Error:', error.message);
        return false;
    }
};
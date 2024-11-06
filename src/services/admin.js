import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';


const JWT_SECRET = process.env.JWT_SECRET || 'Dgenius_Enterprises';

export const registerAdminLogic = async (username, password) => {
    try {
        const userExists = await pool.query(
            'SELECT * FROM admin WHERE username = $1',
            [username]
        );

        if (userExists.rows.length > 0) {
            return 'Username already exists'
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error in registerAdminLogic:', error.message);
        throw new Error('Failed to register admin');
    }
};



export const loginAdminLogic = async (username, password) => {
    try {
        const result = await pool.query(
            'SELECT * FROM admin WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return 'Admin Not register try registring first';
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return 'Invalid credentials';
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, is_admin: true },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return token;
    } catch (error) {
        console.error('Error in loginAdminLogic:', error.message);
        throw new Error('Failed to login admin');
    }
};


export const getSubUsersLogic = async (adminId) => {
    try {

        const result = await pool.query(
            'SELECT su.id, su.username, a.username AS admin_username FROM sub_user su JOIN admin a ON su.admin_id = a.id WHERE a.id = $1',
            [adminId]
        );

        return result.rows;
    } catch (error) {
        console.error('Error in getSubUsersLogic:', error.message);
        throw new Error('Failed to retrieve sub-users');
    }
};


export const createSubUserLogic = async (adminId, username, password) => {
    try {

        const userExists = await pool.query(
            'SELECT * FROM sub_user WHERE username = $1',
            [username]
        );

        if (userExists.rows.length > 0) {
            return 'Username already exists';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO sub_user (username, password, admin_id) VALUES ($1, $2, $3) RETURNING id, username',
            [username, hashedPassword, adminId]
        );

        return result.rows[0];
        
    } catch (error) {
        console.error('Error in createSubUserLogic:', error.message);
        throw new Error('Failed to create sub-user');
    }
};
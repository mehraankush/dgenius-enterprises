import { pool } from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const JWT_SECRET = process.env.JWT_SECRET || 'Dgenius_Enterprises';

export const loginSubUserLogic = async (username, password) => {
    try {
        const result = await pool.query(
            'SELECT * FROM sub_user WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return 'User Not register try registring first';
        }

        const subUser = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, subUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid username or password.'
            });
        }

        const token = jwt.sign(
            { id: subUser.id, username: subUser.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return token;
    } catch (error) {
        console.error('Error logging in sub-user.', error.message);
        throw new Error('Error logging in sub-user.');
    }
};

export const subUserProfile = async (req) => {
    try {

        const result = await pool.query(
            'SELECT su.id, su.username, a.username AS admin_username FROM sub_user su JOIN admin a ON su.admin_id = a.id WHERE su.id = $1',
            [req.subUser.id]
        );

        return result.rows[0];

    } catch (error) {
        console.error('Error getting sub-user profile.', error.message);
        throw new Error('Error getting sub-user profile.');
    }
};
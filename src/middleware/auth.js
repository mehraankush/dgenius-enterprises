import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Dgenius_Enterprises';

export const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Protected route Authentication token required'
            });
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.admin = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};


export const authenticateSubUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.subUser = user;
        next();
    });
};
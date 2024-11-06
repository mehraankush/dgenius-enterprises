import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import {
    createSubUser,
    getSubUsers,
    loginAdmin,
    registerAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.get('/sub-users', authenticateAdmin, getSubUsers);
router.post('/sub-users', authenticateAdmin, createSubUser);

export default router;

import express from 'express';
import { authenticateSubUser } from '../middleware/auth.js';
import {
    getSubUSerProgile,
    loginSubUser
} from '../controllers/subUserController.js';

const router = express.Router();

router.post('/login', loginSubUser);
router.get('/profile', authenticateSubUser, getSubUSerProgile);

export default router;

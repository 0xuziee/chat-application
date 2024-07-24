// src/routes/authRoutes.ts

import express from 'express';
import { registerUser } from '../controllers/authController';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

export default router;
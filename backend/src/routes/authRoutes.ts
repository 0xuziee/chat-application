import express from 'express';
import { registerUser, signIn } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signIn);

export default router;

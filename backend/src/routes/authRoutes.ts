import express from 'express';
import { registerUser, signIn } from '../controllers/authController';
import authenticateToken from '../middlewares/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signIn);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

export default router;



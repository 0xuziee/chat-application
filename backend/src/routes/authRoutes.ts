import express from 'express';
import { registerUser, signIn } from '../controllers/authController';
import authenticateToken from '../middlewares/auth';
import validate from '../middlewares/validationMiddleware';  
import { registerSchema, signInSchema } from '../validation/authValidation';  

const router = express.Router();

router.post('/register', validate(registerSchema), registerUser);

router.post('/signin', validate(signInSchema), signIn);

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

export default router;

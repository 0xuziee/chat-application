import { Router } from 'express';
import { getUserProfile, updateUserProfile  , getFirst10Users} from '../controllers/userController';
import authenticateToken from '../middlewares/auth';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.get('/topTen', getFirst10Users);

export default router;

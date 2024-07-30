import { Request, Response } from 'express';
import User from '../models/user';


interface AuthenticatedRequest extends Request {
    user?: { id: number };
  }
  

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'displayName', 'profilePicture', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { displayName, profilePicture } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.displayName = displayName || user.displayName;
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

export const getFirst10Users = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      limit: 10,  // Limit to the first 10 users
      attributes: ['id', 'username', 'email', 'displayName', 'profilePicture'], // Adjust attributes as needed
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching first 10 users:', error);
    res.status(500).json({ message: 'Error fetching first 10 users' });
  }
};
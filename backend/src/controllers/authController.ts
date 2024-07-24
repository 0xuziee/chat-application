// src/controllers/authController.ts

import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign({ id: newUser.id }, 'Q1a2b3C4d5E6f7G8h9I0jK1l2M3n4O5p6Q7r8S9t0UvWxYzA1b2C3d4E5F6g7H8i9J0kL', { expiresIn: '1h' });

    // Respond with user and token
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

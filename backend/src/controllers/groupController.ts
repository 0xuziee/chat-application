// src/controllers/groupController.ts
import { Request, Response } from 'express';
import Group from '../models/group';  // Adjust import path as needed

export const createGroup = async (req: Request, res: Response) => {
  const { name, members } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Group name is required' });
  }

  try {
    const group = await Group.create({ name });

    // Optionally, add members to the group here

    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Error creating group' });
  }
};

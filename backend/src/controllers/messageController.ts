import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Message from '../models/message';

export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, groupId, messageType, content } = req.body;

  if (!senderId) {
    return res.status(400).json({ message: 'Sender ID is required' });
  }

  if (!messageType) {
    return res.status(400).json({ message: 'Message type is required' });
  }

  if (!receiverId && !groupId) {
    return res.status(400).json({ message: 'Either Receiver ID or Group ID is required' });
  }

  try {
    
    const message = await Message.create({
      senderId,
      receiverId,
      groupId,
      messageType,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { userId, groupId } = req.query;

  try {
    const whereClause = {};

    if (userId) {
      Object.assign(whereClause, {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId },
          { groupId: null },  
        ],
      });
    }

    if (groupId) {
      Object.assign(whereClause, { groupId });
    }

    const messages = await Message.findAll({
      where: whereClause,
      include: ['sender', 'receiver'],  
      order: [['createdAt', 'ASC']],    
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const getGroupMessages = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { groupId },
      include: ['sender'],  
      order: [['createdAt', 'ASC']],  
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    res.status(500).json({ message: 'Error fetching group messages' });
  }
};

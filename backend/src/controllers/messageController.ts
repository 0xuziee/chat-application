import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Message from '../models/message';
import User from '../models/user';
import { Server } from 'socket.io';
import { ParsedQs } from 'qs';

// Helper function to parse query ID
const parseQueryId = (id: string | string[] | ParsedQs | ParsedQs[] | undefined): string | undefined => {
  if (Array.isArray(id)) {
    return id[0] as string;
  }
  return id as string;
};

// Controller to send a message
export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, groupId, messageType, content } = req.body;

  if (!senderId || !messageType || (!receiverId && !groupId)) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const message = await Message.create({
      senderId,
      receiverId,
      groupId,
      messageType,
      content,
    });

    // Emit the new message to all connected clients
    const io: Server = req.app.get('io');
    io.emit('newMessage', message);

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

export const getMessagesFromUser = async (req: Request, res: Response) => {
  const { userId, otherUserId } = req.body;

  if (!userId || !otherUserId) {
    return res.status(400).json({ error: 'userId and otherUserId are required' });
  }

  try {
    const messages = await Message.findAll({
      where: {
        senderId: otherUserId,
        receiverId: userId,
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages from user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getMessages = async (req: Request, res: Response) => {
  const { userId, otherUserId } = req.query;

  // Ensure that userId and otherUserId are strings
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;
  const otherUserIdStr = Array.isArray(otherUserId) ? otherUserId[0] : otherUserId;

  if (!userIdStr || !otherUserIdStr) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userIdStr, receiverId: otherUserIdStr },
          { senderId: otherUserIdStr, receiverId: userIdStr },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Controller to get messages by group ID
export const getGroupMessages = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { groupId },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'profilePicture'] }
      ],
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    res.status(500).json({ message: 'Error fetching group messages' });
  }
};

// Controller to get direct messages between two users
export const getDirectMessages = async (req: Request, res: Response) => {
  const userId = parseQueryId(req.query.userId);
  const otherUserId = parseQueryId(req.query.otherUserId);

  if (!userId || !otherUserId) {
    return res.status(400).json({ message: 'Both userId and otherUserId are required' });
  }

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'username', 'profilePicture'] },
        { model: User, as: 'receiver', attributes: ['id', 'username', 'profilePicture'] }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching direct messages:', error);
    res.status(500).json({ message: 'Error fetching direct messages' });
  }
};

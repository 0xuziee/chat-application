// src/validation/messageValidation.ts
import { z } from 'zod';

export const sendMessageSchema = z.object({
  senderId: z.string().min(1, { message: 'Sender ID is required' }),
  receiverId: z.string().optional(),
  groupId: z.string().optional(),
  messageType: z.string().min(1, { message: 'Message type is required' }),
  content: z.string().optional(),
});

export const getMessagesSchema = z.object({
  userId: z.string().optional(),
  groupId: z.string().optional(),
});

export const getGroupMessagesSchema = z.object({
  groupId: z.string().min(1, { message: 'Group ID is required' }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;
export type GetGroupMessagesInput = z.infer<typeof getGroupMessagesSchema>;

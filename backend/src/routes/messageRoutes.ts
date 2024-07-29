import express from 'express';
import { sendMessage, getMessages, getGroupMessages } from '../controllers/messageController';
import validate from '../middlewares/validationMiddleware';  
import { sendMessageSchema, getMessagesSchema, getGroupMessagesSchema } from '../validation/messageValidation';  

const router = express.Router();

router.post('/send', validate(sendMessageSchema), sendMessage);

router.get('/get', validate(getMessagesSchema), getMessages);

router.get('/group/:groupId', validate(getGroupMessagesSchema), getGroupMessages);

export default router;

import express from 'express';
import { sendMessage, getMessages, getGroupMessages ,getDirectMessages } from '../controllers/messageController';
import validate from '../middlewares/validationMiddleware';  
import { sendMessageSchema, getMessagesSchema, getGroupMessagesSchema } from '../validation/messageValidation';  
import { getMessagesFromUser } from '../controllers/messageController';
const router = express.Router();

router.post('/send', validate(sendMessageSchema), sendMessage);

router.get('/get', validate(getMessagesSchema), getMessages);

router.get('/direct-messages', validate(getMessagesSchema), getDirectMessages);



router.get('/group/:groupId', validate(getGroupMessagesSchema), getGroupMessages);

router.post('/messages-from-user', getMessagesFromUser);


export default router;

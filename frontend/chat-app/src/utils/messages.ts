import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const sendMessage = async (message: { senderId: string; receiverId?: string; groupId?: string; messageType: string; content: string }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/send', message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessages = async (userId: string, groupId?: string) => {
  try {
    const response = await axios.get('http://localhost:5000/api/get', { params: { userId, groupId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

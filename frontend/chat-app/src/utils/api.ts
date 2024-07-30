// src/utils/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMessages = (userId: string, otherUserId: string) => {
  return axios.get(`${API_URL}/messages/direct`, {
    params: { userId, otherUserId },
  });
};

interface MessagePayload {
  senderId: string;
  receiverId: string | null;
  groupId: string | null;
  messageType: string;
  content: string;
}

export const sendMessage = async (payload: MessagePayload) => {
  try {
    const response = await axios.post('http://localhost:5000/api/messages/send', payload);
    return response.data; // Assuming the response contains the message data
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Error sending message');
  }
};

export const getTopTenUsers = () => {
  return axios.get(`${API_URL}/user/topTen`);
};


export const fetchDirectMessages = async (userId: string, otherUserId: string) => {
  const response = await axios.get(`${API_URL}/messages/direct`, { params: { userId, otherUserId } });
  return response.data;
};

export const fetchGroupMessages = async (groupId: string) => {
  const response = await axios.get(`${API_URL}/messages/group/${groupId}`);
  return response.data;
};


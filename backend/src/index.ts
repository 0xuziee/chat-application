import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from  './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import groupRoutes from './routes/groupRoutes';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import http from 'http';
import SocketIO from'./socket';
import cors from 'cors';


dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

SocketIO.attach(server);


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api',messageRoutes);
app.use('/api',groupRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

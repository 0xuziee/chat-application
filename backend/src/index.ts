// src/index.ts

import express from 'express';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

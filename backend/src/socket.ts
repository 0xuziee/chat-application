// src/socket.ts
import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export default io;

// src/socket.ts
import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", (message) => {
    io.emit("message", message); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    console.log("Client disconnected Successfully");
  });
});

export default io;

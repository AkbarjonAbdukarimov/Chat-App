import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const users = [];
// Set up Socket.IO connection and event handling
io.on("connection", (socket: Socket) => {
  console.log("New user connected", socket.id);
  socket.on("new-user", (msg) => {
    users.push({ ...msg, id: socket.id });
    socket.emit("users", users);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server on port
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
type user = { user: string; id: string };
type message = { sender: user; message: string; reciver: user };
const users: user[] = [];
const messages: Array<message> = [];
// Set up Socket.IO connection and event handling
io.on("connection", (socket: Socket) => {
  console.log("New user connected", socket.id);
  socket.on("new-user", (msg) => {
    users.push({ ...msg, id: socket.id });
    socket.emit("connected-user", { ...msg, id: socket.id });
    io.emit("users", users);
  });
  socket.on("private-message-sending", (msg: message) => {
    console.log(msg);
    socket.to(msg.reciver.id).emit("private-message-recieving", msg);
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

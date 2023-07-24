import http from "http";
import { Server, Socket } from "socket.io";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURL = process.env.MONGO;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT } });

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
server.listen(port, async () => {
  try {
    if (!mongoURL) throw new Error("Invalid Database Connection String");
    await mongoose.connect(mongoURL);
    console.log("Database connected!");
    console.log("Serving on port", port);
  } catch (error) {}
});

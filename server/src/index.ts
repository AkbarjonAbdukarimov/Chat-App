import socketio from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "*" } });

app.use(cors({ origin: "*" }));
io.on("connection", (socket) => {
  socket.on("disconnect", (message) => {
    console.log("user disconnected", message);
  });
  socket.on("recieve-message", (message) => {
    console.log(message);
    socket.broadcast.emit("send-message", message);
  });
});

server.listen(3000, () => {
  console.log("Running at localhost:3000");
});

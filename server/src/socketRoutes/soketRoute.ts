import SocketServer from "../SoketServer";
import IUser from "../interfaces/IUser";
import Chat from "../models/Chat";

const io = SocketServer.getInstance;

const startSocketServer = () => {
  console.log("Starting Socket Server");
  io.on("connection", (socket) => {
    console.log("New user connected", socket.id);
    socket.on("newUser", (msg) => {
      socket.data.user = { ...JSON.parse(msg), socketId: socket.id };
      const users: IUser[] = [];

      io.sockets.sockets.forEach((value, key, map) => {
        users.push(value.data.user);
      });
      io.emit("activeUsers", users);
      // Chat.find({ users: { $in: [msg.id] } }, { password: 0 }).then((data) =>
      //   socket.emit("chats", data)
      // );
    });
    //     socket.on("hello", () => {});
    //     socket.on("basicEmit", (a, b, c) => {
    //       // a is inferred as nuwmber, b as string and c as buffer
    //     });
    //     socket.on("new-user", (msg) => {
    //       users.push({ ...msg, id: socket.id });
    //       socket.emit("connected-user", { ...msg, id: socket.id });
    //       io.emit("users", users);
    //     });
    //     socket.on("private-message-sending", (msg: message) => {
    //       console.log(msg);
    //       socket.to(msg.reciver.id).emit("private-message-recieving", msg);
    //     });

    //     // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
      const users: IUser[] = [];
      io.sockets.sockets.forEach((value, key, map) => {
        users.push(value.data.user);
      });
      io.emit("activeUsers", users);
    });
  });
};
export default startSocketServer;

import { NextFunction, Request, Response, Router } from "express";
import Tokenizer from "../utils/Tokenizer";
import IUser from "../interfaces/IUser";
import Chat from "../models/Chat";
import Message from "../models/Message";
import mongoose from "mongoose";

const chatRouter = Router();
chatRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const user = Tokenizer.decryptUser<IUser>(req);
  const chats = await Chat.find({ users: { $in: [user.id] } }).populate({
    path: "users",
    select: "username id",
  });
  res.send(chats);
});
chatRouter.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = Tokenizer.decryptUser<IUser>(req);
      const { users } = req.body;
      const chat = await Chat.create({ users });
      res.send(chat);
    } catch (error) {
      next(error);
    }
  }
);
chatRouter.get(
  "/:chatId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.chatId);
      const msgs = await Message.find({
        chat: id,
      });

      res.send({ messages: msgs });
    } catch (error) {
      next(error);
    }
  }
);
export default chatRouter;

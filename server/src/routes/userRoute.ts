import { Router, Request, Response, NextFunction } from "express";
import Password from "../utils/Password";
import User from "../models/User";
import Tokenizer from "../utils/Tokenizer";

const userRouter = Router();
userRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { username, password } = req.body;
      const hash = await Password.hashPassword(password);
      const hashed = `${hash.buff}.${hash.salt}`;
      const { id } = await User.create({ username, password: hashed });
      const token = Tokenizer.sign({ id, username });
      res.send({ id, username, token });
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) throw new Error("Invalid Credentials");
      const isValidPass = await Password.compare(password, user.password);
      if (!isValidPass) throw new Error("Invalid Credentials");
      const token = Tokenizer.sign({ id: user.id, username });
      res.send({ id: user.id, username, token });
    } catch (error) {
      next(error);
    }
  }
);
export default userRouter;

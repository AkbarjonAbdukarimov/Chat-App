import cors from "cors";
import express, { json } from "express";
import userRouter from "./routes/userRoute";
import chatRouter from "./routes/chatRoutes";
import path from "path";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
console.log(path.join(__dirname, "..", "public"));
app.use(json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

export default app;

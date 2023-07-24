import cors from "cors";
import express, { json } from "express";
import userRouter from "./routes/userRoute";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(json());

app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});

export default app;

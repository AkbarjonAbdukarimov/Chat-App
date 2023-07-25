import mongoose from "mongoose";
import dotenv from "dotenv";
import io from "./SoketServer";
import server from "./WebServer";
import startSocketServer from "./socketRoutes/soketRoute";
dotenv.config();
const mongoURL = process.env.MONGO;

// Set up Socket.IO connection and event handling

// Start the server on port
const port = process.env.PORT || 5000;
server.listen(port, async () => {
  try {
    if (!mongoURL) throw new Error("Invalid Database Connection String");
    await mongoose.connect(mongoURL);
    console.log("Database connected!");
    console.log("Serving on port", port);
    startSocketServer();
  } catch (error) {}
});

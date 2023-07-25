import { Server } from "socket.io";
import server from "./WebServer";
import ClientToServerEvents from "./interfaces/ClientToServerEvents";
import ServerToClientEvents from "./interfaces/ServerToClientEvents";
import SocketData from "./interfaces/SocketData";
import InterServerEvents from "./interfaces/InterServerEvents";
class SocketServer {
  private static _io:
    | Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >
    | undefined;

  public static get getInstance() {
    return (
      this._io ||
      (this._io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >(server, { cors: { origin: "*" } }))
    );
  }
}

export default SocketServer;

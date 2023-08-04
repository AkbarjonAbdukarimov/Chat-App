import { IMessage } from "./IMessage";
import IUser from "./IUser";

export default interface ClientToServerEvents {
  newUser: (user: IUser) => void;
  recieveMsg: (msg: IMessage) => void;
  getChatMessages: (chat: IUser) => void;
}

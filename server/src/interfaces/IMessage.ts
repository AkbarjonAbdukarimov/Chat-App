import IChat from "./IChat";
import IUser from "./IUser";

export interface IMessage {
  id?: string;
  sender: IUser["id"];
  reciever: IUser;
  message: string;
  chat: IChat["id"];
  file: { buffer: Buffer; type: string; originalName: string };
}

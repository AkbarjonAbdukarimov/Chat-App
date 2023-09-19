import IUser from "./IUser";

export default interface IChat {
  admin: string;
  user: IUser;
  id?: string;
  unreadMsgs:number
}

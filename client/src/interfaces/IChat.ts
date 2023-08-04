import IUser from "./IUser";

export default interface IChat {
  users: Array<IUser>;
  id?: string;
}

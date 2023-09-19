export default interface IUser {
  id: string;
  _id?: string;

  fullName: string;
  phoneNumber: number;
  token: string;
  socketId: string;
  status:Boolean
}

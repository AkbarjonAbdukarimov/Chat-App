import user from "./user.type";

type Message = {
  sender: user;
  message: string;
  reciver: user;
};
export default Message;

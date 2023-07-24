import { Document, Schema, model } from "mongoose";
import User from "./User";
import Chat from "./Chat";

interface Message extends Document {
  sender: Schema.Types.ObjectId;
  reciever: Schema.Types.ObjectId;
  chat: Schema.Types.ObjectId;
  message: string;
  file: string;
}
const messageSchema = new Schema<Message>(
  {
    sender: { type: Schema.Types.ObjectId, required: true, reg: User },
    reciever: { type: Schema.Types.ObjectId, required: true, reg: User },
    chat: { type: Schema.Types.ObjectId, required: true, reg: Chat },
    message: String,
    file: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Message = model<Message>("Message", messageSchema);

export default Message;

import { Document, Model, Schema, model } from "mongoose";
import User from "./User";
import Chat from "./Chat";

interface Message extends Document {
  sender: Schema.Types.ObjectId;
  reciever: Schema.Types.ObjectId;
  chat: Schema.Types.ObjectId;
  message: string;
  file: string;
}
interface MessageModel extends Model<Message> {
  build(attrs: Message): Message;
}
const messageSchema = new Schema(
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
messageSchema.statics.build = (attrs) => new Message(attrs);
const Message = model<Message, MessageModel>("Message", messageSchema);

export default Message;

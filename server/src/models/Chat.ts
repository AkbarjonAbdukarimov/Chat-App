import { Document, Schema, model } from "mongoose";
import User from "./User";

interface Chat extends Document {
  users: Schema.Types.ObjectId[];
}
const charSchema = new Schema<Chat>(
  {
    users: { type: [Schema.Types.ObjectId], required: true, reg: User },
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

const Chat = model<Chat>("Chat", charSchema);

export default Chat;

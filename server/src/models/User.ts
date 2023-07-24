import { Document, Schema, model } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}
const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

const User = model<User>("User", userSchema);

export default User;

import { ObjectId } from "mongoose";

export default interface IChat {
  users: Array<ObjectId>;
  id: ObjectId;
}

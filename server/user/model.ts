import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  username: string;
  password: string;
  dateJoined: Date;
  isAdmin: boolean;
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;

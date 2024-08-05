import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const UserModel =
  (mongoose.models?.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
export default UserModel;

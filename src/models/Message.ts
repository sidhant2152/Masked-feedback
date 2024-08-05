import mongoose, { Schema } from "mongoose";

export interface IMessage {
  content: string;
  createdAt: Date;
  user: mongoose.Types.ObjectId;
}

const messageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const MessageModel =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;

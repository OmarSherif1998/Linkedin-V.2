/** @format */

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    roomId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);
const Message = mongoose.model("Message", messageSchema);
export default Message;

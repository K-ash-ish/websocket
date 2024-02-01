import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({});

export const Chat = mongoose.model("Chat", chatSchema);

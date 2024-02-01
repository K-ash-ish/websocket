import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({});

export const Group = mongoose.model("Group", groupSchema);

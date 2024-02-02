import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: { type: String },
    bio: { type: String, maxLength: [60, "Can be only 60 characters long!"] },
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    publc: { type: Boolean, default: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);

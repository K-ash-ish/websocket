import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: [8, "Must be at least 8 characters long"],
    },
    bio: {
      type: String,
      maxLength: [60, "Can be only 60 characters long!"],
    },
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

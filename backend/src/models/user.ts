import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

export const User = model<IUser>("User", userSchema);

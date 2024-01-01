import { Schema, model } from "mongoose";

export interface ITemplate {
  name?: String;
  age?: Number;
  joinDate: Date;
  isNew?: Boolean;
}

export const templateSchema = new Schema<ITemplate>({
  name: String,
  age: Number,
  joinDate: { type: Date, required: true },
  isNew: Boolean,
});

export const Template = model<ITemplate>("Template", templateSchema);

import { Schema, model } from "mongoose";

export interface IIngredient {
  name: String;
  age: Number;
  joinDate: Date;
  role: String;
  isNew: boolean;
}

export const ingredientSchema = new Schema<IIngredient>({
  // name: { type: String, required: true },
  // age: { type: Number, required: true },
  // joinDate: { type: Date, required: true },
  // role: { type: String, required: true },
  name: String,
  age: Number,
  joinDate: Date,
  role: String,
  isNew: Boolean,
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);

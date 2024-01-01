import { Schema, model } from "mongoose";

export interface IIngredient {
  // id: Number;
  name: String;
  age: Number;
  joinDate: Date;
  role: String;
}

export const ingredientSchema = new Schema<IIngredient>({
  // id: { type: Number, required: true },
  // name: { type: String, required: true },
  // age: { type: Number, required: true },
  // joinDate: { type: Date, required: true },
  // role: { type: String, required: true },
  name: String,
  age: Number,
  joinDate: Date,
  role: String,
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);

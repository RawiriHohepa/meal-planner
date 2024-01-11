import { Schema, model } from "mongoose";

export interface IIngredient {
  name: string;
  unit: string;
  amount?: number;
}

export const ingredientSchema = new Schema<IIngredient>({
  // name: { type: String, required: true },
  // age: { type: Number, required: true },
  // joinDate: { type: Date, required: true },
  // role: { type: String, required: true },
  name: String,
  unit: String,
  amount: Number,
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);

import { Schema, model } from "mongoose";

export interface IIngredient {
  name: string;
  unit: string;
  amount?: number;
}

export const ingredientSchema = new Schema<IIngredient>({
  name: String,
  unit: String,
  amount: Number,
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);

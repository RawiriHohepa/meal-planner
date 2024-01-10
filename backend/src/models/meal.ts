import { Schema, model } from "mongoose";
import { IIngredient } from "./ingredient";

export interface IMeal {
  name: String;
  ingredients: Array<IIngredient>;
}

export const mealSchema = new Schema<IMeal>({
  name: { type: String, required: true },
  ingredients: Array<IIngredient>,
});

export const Meal = model<IMeal>("Meal", mealSchema);

import { Model, Schema, model } from "mongoose";
import crudActions from "./crudActions";

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

export let Ingredient: Model<IIngredient>;
try {
  Ingredient = model<IIngredient>("Ingredient");
} catch (error) {
  Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
}

export const { getItems: getIngredients } = crudActions(Ingredient);

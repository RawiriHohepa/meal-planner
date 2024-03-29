import { Model, Schema, model } from "mongoose";
import crudActions from "./crudActions";
import { IIngredient } from "./ingredient";

export interface IMeal {
  name: string;
  ingredients: Array<IIngredient>;
  portionIds: Array<string>;
}

export const mealSchema = new Schema<IMeal>({
  name: { type: String, required: true },
  ingredients: Array<IIngredient>,
  portionIds: Array<String>,
});

export let Meal: Model<IMeal>;
try {
  Meal = model<IMeal>("Meal");
} catch (error) {
  Meal = model<IMeal>("Meal", mealSchema);
}

export const { getItems: getMeals } = crudActions(Meal);

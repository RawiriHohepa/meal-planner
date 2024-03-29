import { Model, ObjectId, Schema, model } from "mongoose";
import crudActions from "./crudActions";

export interface IPortion {
  ingredientId: string;
  amount: number;
}

export const portionSchema = new Schema<IPortion>({
  ingredientId: String,
  amount: Number,
});

export let Portion: Model<IPortion>;
try {
  Portion = model<IPortion>("Portion");
} catch (error) {
  Portion = model<IPortion>("Portion", portionSchema);
}

export const {
  getItems: getPortions,
  createItem: createPortion,
  updateItem: updatePortion,
  deleteItem: deletePortion,
} = crudActions(Portion);

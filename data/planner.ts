import { Model, Schema, model } from "mongoose";
import crudActions from "./crudActions";

interface ISelectedMeals {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface IPlanner {
  name: string;
  selectedMeals: ISelectedMeals;
}

export const plannerSchema = new Schema<IPlanner>({
  name: { type: String, required: true },
  selectedMeals: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
});

export let Planner: Model<IPlanner>;
try {
  Planner = model<IPlanner>("Planner");
} catch (error) {
  Planner = model<IPlanner>("Planner", plannerSchema);
}

export const { getItem: getPlanner } = crudActions(Planner);

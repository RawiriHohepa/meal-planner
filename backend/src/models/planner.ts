import { Schema, model } from "mongoose";

interface ISelectedMeals {
  // _id: Schema.Types.ObjectId;
  monday: String;
  tuesday: String;
  wednesday: String;
  thursday: String;
  friday: String;
  saturday: String;
  sunday: String;
}

export interface IPlanner {
  name: String;
  selectedMeals: ISelectedMeals;
}

// const selectedMealsSchema = new Schema<ISelectedMeals>({
//   _id: { type: Schema.Types.ObjectId, value: null },
//   monday: String,
//   tuesday: String,
//   wednesday: String,
//   thursday: String,
//   friday: String,
//   saturday: String,
//   sunday: String,
// });

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

export const Planner = model<IPlanner>("Planner", plannerSchema);

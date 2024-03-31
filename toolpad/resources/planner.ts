import { getMealRecords } from "./meals";
import {
  ISelectedMeals,
  getPlanner,
  updatePlanner as updatePlannerData,
} from "../../data/planner";

export const updatePlanner = async (_id: string, plan: any) => {
  const planner = await getPlanner(_id);
  const meals = (await getMealRecords()).records;

  if (!planner) return;

  let populatedPlan: ISelectedMeals = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  };
  Object.entries(plan).forEach(([day, name]) => {
    if (name === "None") {
      populatedPlan[day.toLowerCase()] = "";
      return;
    }

    const meal = meals.find((meal) => meal.name === name);
    populatedPlan[day.toLowerCase()] = meal?._id.toString() || "";
  });

  await updatePlannerData(_id, {
    name: planner.name,
    selectedMeals: populatedPlan,
  });
};

export const getSelectedMeals = async (_id: string) => {
  const planner = await getPlanner(_id);
  const meals = (await getMealRecords()).records;

  if (!planner) return;

  let populatedPlan = {};
  Object.entries(planner.selectedMeals).forEach(([day, mealId]) => {
    const meal = meals.find((meal) => meal._id.equals(mealId));
    populatedPlan[day] = meal?.name;
  });

  return populatedPlan;
};

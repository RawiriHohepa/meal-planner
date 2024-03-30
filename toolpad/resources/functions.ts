import { getMealRecords } from "./meals";
import { getPlanner } from "../../data/planner";

export const savePlan = async (plan: any) => {
  const meals = (await getMealRecords()).records;
  let populatedPlan = {};

  Object.entries(plan).forEach(([day, name]) => {
    populatedPlan[day] = meals.find((row) => row.name === name);
  });

  console.log(populatedPlan);
};

export const getSelectedMeals = async (_id: string) => {
  const planner = await getPlanner(_id);
  const meals = (await getMealRecords()).records;

  const selectedMeals = planner?.selectedMeals;
  if (!selectedMeals) return;

  let populatedPlan = {};

  Object.entries(selectedMeals).forEach(([day, mealId]) => {
    populatedPlan[day] = meals.find((meal) => meal._id.equals(mealId));
  });

  return populatedPlan;
};

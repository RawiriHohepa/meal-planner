import { getMealRecords } from "./meals";
import {
  ISelectedMeals,
  getPlanner,
  updatePlanner as updatePlannerData,
} from "../../data/planner";
import { getPortionRecords } from "./portions";

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

export const getShoppingList = async (_id: string) => {
  const planner = await getPlanner(_id);
  const meals = (await getMealRecords()).records;
  const portions = (await getPortionRecords()).records;

  if (!planner) return;

  let totalledPortions = {};
  Object.values(planner.selectedMeals)
    .filter((selectedMealId) => !!selectedMealId)
    .forEach((selectedMealId) => {
      const selectedMeal = meals.find((meal) =>
        meal._id.equals(selectedMealId)
      );
      if (!selectedMeal) return;
      selectedMeal.portions.forEach((selectedPortion) => {
        const selectedPortionId = selectedPortion._id.toString();
        totalledPortions[selectedPortionId] =
          (totalledPortions[selectedPortionId] || 0) + selectedPortion.amount;
      });
    });

  return Object.entries(totalledPortions).map(([totalledPortionId, amount]) => {
    const totalledPortion = portions.find((portion) =>
      portion._id.equals(totalledPortionId)
    );
    return {
      portion: totalledPortion?.ingredient,
      amount,
      unit: totalledPortion?.unit,
    };
  });
};

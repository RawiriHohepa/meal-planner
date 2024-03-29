/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { getMeals, createMeal, updateMeal, deleteMeal } from "../../data/meal";
import { getPortionRecords } from "./portions";

export const getMealRecords = async () => {
  const portionRecords = (await getPortionRecords()).records;

  const meals = (await getMeals()).records;

  const records = meals.map((mealObject) => {
    const meal = mealObject.toJSON();
    const portions = meal.portionIds.map((portionId) =>
      portionRecords.find((portion) => portion._id.equals(portionId))
    );

    const portionsFormatted = portions.map(
      (portion) =>
        `${portion?.amount}${portion?.unit || ""} ${portion?.ingredient}`
    );

    return {
      ...meal,
      portions: portionsFormatted,
    };
  });

  return { records };
};

export default createDataProvider({
  getRecords: getMealRecords,
  createRecord: createMeal,
  updateRecord: updateMeal,
  deleteRecord: deleteMeal,
});

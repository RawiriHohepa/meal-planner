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
    const portions = portionRecords.filter((portionRecord) =>
      meal.portionIds.includes(portionRecord._id.toString())
    );

    return {
      ...meal,
      portions,
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

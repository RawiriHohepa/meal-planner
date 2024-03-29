/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { connect } from "mongoose";
// import { Meal, meals } from "../../data/json/meals";
import { getPortionRecords } from "./portions";
import { getMeals } from "../../data/meal";

const connectToDb = async () => {
  await connect(process.env.MONGODB_CONNECTION_STRING || "");
};

export const getMealRecords = async () => {
  const portionRecords = (await getPortionRecords()).records;

  await connectToDb();
  const meals = await getMeals();

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

// const createMealRecord = async (data: Meal) => {
//   const highestId = meals.reduce((maxId, meal) => Math.max(maxId, meal.id), 0);
//   const newMeal = { ...data, id: highestId + 1 };
//   meals.push(newMeal);
//   return newMeal;
// };

// const updateMealRecord = async (id: number, data: Omit<Meal, "id">) => {
//   const index = meals.findIndex((item) => item.id === id);

//   Object.assign(meals[index], data);
//   return meals[index];
// };

// const deleteMealRecord = async (id: number) => {
//   const index = meals.findIndex((item) => item.id === id);
//   meals.splice(index, 1);
// };

export default createDataProvider({
  getRecords: getMealRecords,
  // createRecord: createMealRecord,
  // updateRecord: updateMealRecord,
  // deleteRecord: deleteMealRecord,
});

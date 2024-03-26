/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { Meal, meals } from "../../data/meal";

export default createDataProvider({
  async getRecords() {
    return {
      records: meals,
    };
  },

  async createRecord(data: Meal) {
    const highestId = meals.reduce(
      (maxId, meal) => Math.max(maxId, meal.id),
      0
    );
    // Assign a new unique id to the new meal
    const newMeal = { ...data, id: highestId + 1 };
    meals.push(newMeal);
    return newMeal;
  },

  async updateRecord(id: number, data: Omit<Meal, "id">) {
    const index = meals.findIndex((item) => item.id === id);

    Object.assign(meals[index], data);
    return meals[index];
  },

  async deleteRecord(id: number) {
    const index = meals.findIndex((item) => item.id === id);
    meals.splice(index, 1);
  },
});

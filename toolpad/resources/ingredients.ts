/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { Ingredient, ingredients } from "../../data/ingredients";

export default createDataProvider({
  async getRecords() {
    return {
      records: ingredients,
    };
  },

  async createRecord(data: Ingredient) {
    const highestId = ingredients.reduce(
      (maxId, ingredient) => Math.max(maxId, ingredient.id),
      0
    );
    // Assign a new unique id to the new ingredient
    const newIngredient = { ...data, id: highestId + 1 };
    ingredients.push(newIngredient);
    return newIngredient;
  },

  async updateRecord(id: number, data: Omit<Ingredient, "id">) {
    const index = ingredients.findIndex((item) => item.id === id);

    Object.assign(ingredients[index], data);
    return ingredients[index];
  },

  async deleteRecord(id: number) {
    const index = ingredients.findIndex((item) => item.id === id);
    ingredients.splice(index, 1);
  },
});

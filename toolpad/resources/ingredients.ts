/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { Ingredient, ingredients } from "../../data/ingredients";

export const getIngredientRecords = async () => {
  const records = ingredients;

  return { records };
};

const createIngredientRecord = async (data: Ingredient) => {
  const highestId = ingredients.reduce(
    (maxId, ingredient) => Math.max(maxId, ingredient.id),
    0
  );
  const newIngredient = { ...data, id: highestId + 1 };
  ingredients.push(newIngredient);
  return newIngredient;
};

const updateIngredientRecord = async (
  id: number,
  data: Omit<Ingredient, "id">
) => {
  const index = ingredients.findIndex((item) => item.id === id);

  Object.assign(ingredients[index], data);
  return ingredients[index];
};

const deleteIngredientRecord = async (id: number) => {
  const index = ingredients.findIndex((item) => item.id === id);
  ingredients.splice(index, 1);
};

export default createDataProvider({
  getRecords: getIngredientRecords,
  createRecord: createIngredientRecord,
  updateRecord: updateIngredientRecord,
  deleteRecord: deleteIngredientRecord,
});

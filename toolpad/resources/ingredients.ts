/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import connectToDb from "../../data/connectToDb";
// import { Ingredient, ingredients } from "../../data/json/ingredients";
import {
  IIngredient,
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../data/ingredient";

export const getIngredientRecords = async () => {
  await connectToDb();
  const records = await getIngredients();
  return { records };
};

const createIngredientRecord = async (data: IIngredient) => {
  return await createIngredient(data);
};

const updateIngredientRecord = async (_id: string, data: IIngredient) => {
  return await updateIngredient(_id, data);
};

const deleteIngredientRecord = async (_id: string) => {
  return await deleteIngredient(_id);
};

export default createDataProvider({
  getRecords: getIngredientRecords,
  createRecord: createIngredientRecord,
  updateRecord: updateIngredientRecord,
  deleteRecord: deleteIngredientRecord,
});

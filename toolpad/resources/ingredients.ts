/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import connectToDb from "../../data/connectToDb";
import {
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

export default createDataProvider({
  getRecords: getIngredientRecords,
  createRecord: createIngredient,
  updateRecord: updateIngredient,
  deleteRecord: deleteIngredient,
});

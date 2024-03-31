/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../data/ingredient";

export { getIngredients as getIngredientRecords } from "../../data/ingredient";

export default createDataProvider({
  getRecords: getIngredients,
  createRecord: createIngredient,
  updateRecord: updateIngredient,
  deleteRecord: deleteIngredient,
});

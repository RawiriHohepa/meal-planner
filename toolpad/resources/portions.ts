/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import {
  getPortions,
  createPortion,
  updatePortion,
  deletePortion,
} from "../../data/portion";
import { getIngredients } from "../../data/ingredient";

export const getPortionRecords = async () => {
  const portions = (await getPortions()).records;
  const ingredients = (await getIngredients()).records;

  const records = portions.map((portionObject) => {
    const portion = portionObject.toJSON();
    const ingredient = ingredients.find((ingredient) =>
      ingredient._id.equals(portion.ingredientId)
    );

    return {
      ...portion,
      ingredient: ingredient?.name,
      unit: ingredient?.unit,
    };
  });

  return { records };
};

export default createDataProvider({
  getRecords: getPortionRecords,
  createRecord: createPortion,
  updateRecord: updatePortion,
  deleteRecord: deletePortion,
});

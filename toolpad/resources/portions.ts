/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { getIngredientRecords } from "./ingredients";
import connectToDb from "../../data/connectToDb";
import {
  getPortions,
  createPortion,
  updatePortion,
  deletePortion,
} from "../../data/portion";

export const getPortionRecords = async () => {
  const ingredients = (await getIngredientRecords()).records;

  await connectToDb();
  const portions = await getPortions();

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

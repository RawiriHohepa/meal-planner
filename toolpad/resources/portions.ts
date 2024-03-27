/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { Portion, portions } from "../../data/json/portions";
import { getIngredientRecords } from "./ingredients";

export const getPortionRecords = async () => {
  const ingredients = (await getIngredientRecords()).records;

  const records = portions.map((portion) => {
    const ingredient = ingredients.find((ingredient) =>
      ingredient._id.equals("" + portion.ingredientId)
    );

    return {
      ...portion,
      ingredient: ingredient?.name,
      unit: ingredient?.unit,
    };
  });

  return { records };
};

const createPortionRecord = async (data: Portion) => {
  const highestId = portions.reduce(
    (maxId, portion) => Math.max(maxId, portion.id),
    0
  );
  const newPortion = { ...data, id: highestId + 1 };
  portions.push(newPortion);
  return newPortion;
};

const updatePortionRecord = async (id: number, data: Omit<Portion, "id">) => {
  const index = portions.findIndex((item) => item.id === id);

  Object.assign(portions[index], data);
  return portions[index];
};

const deletePortionRecord = async (id: number) => {
  const index = portions.findIndex((item) => item.id === id);
  portions.splice(index, 1);
};

export default createDataProvider({
  getRecords: getPortionRecords,
  createRecord: createPortionRecord,
  updateRecord: updatePortionRecord,
  deleteRecord: deletePortionRecord,
});

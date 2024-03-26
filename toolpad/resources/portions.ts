/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";
import { Portion, portions } from "../../data/portions";

export default createDataProvider({
  async getRecords() {
    return {
      records: portions,
    };
  },

  async createRecord(data: Portion) {
    const highestId = portions.reduce(
      (maxId, portion) => Math.max(maxId, portion.id),
      0
    );
    // Assign a new unique id to the new portion
    const newPortion = { ...data, id: highestId + 1 };
    portions.push(newPortion);
    return newPortion;
  },

  async updateRecord(id: number, data: Omit<Portion, "id">) {
    const index = portions.findIndex((item) => item.id === id);

    Object.assign(portions[index], data);
    return portions[index];
  },

  async deleteRecord(id: number) {
    const index = portions.findIndex((item) => item.id === id);
    portions.splice(index, 1);
  },
});

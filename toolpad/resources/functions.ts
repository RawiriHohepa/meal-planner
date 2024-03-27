import { getMealRecords } from "./meals";

export const savePlan = async (plan: any) => {
  const meals = (await getMealRecords()).records;
  let populatedPlan = {};

  Object.entries(plan).forEach(([day, name]) => {
    populatedPlan[day] = meals.find((row) => row.name === name);
  });

  console.log(populatedPlan);
};

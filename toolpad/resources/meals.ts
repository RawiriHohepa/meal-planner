/**
 * Toolpad Studio data provider file.
 * See: https://mui.com/toolpad/studio/concepts/data-providers/
 */

import { createDataProvider } from "@toolpad/studio/server";

let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

interface Meal {
  id: number;
  name: string;
}

const meals: Meal[] = [
  {
    id: generateId(),
    name: "Emily Lee",
  },
  {
    id: generateId(),
    name: "Liam Patel",
  },
  {
    id: generateId(),
    name: "Emma Garcia",
  },
  {
    id: generateId(),
    name: "William Wong",
  },
  {
    id: generateId(),
    name: "Ava Kim",
  },
  {
    id: generateId(),
    name: "Ethan Chen",
  },
];

export default createDataProvider({
  async getmeals() {
    return {
      meals,
    };
  },

  async createMeal(data: Meal) {
    const highestId = meals.reduce(
      (maxId, meal) => Math.max(maxId, meal.id),
      0
    );
    // Assign a new unique id to the new meal
    const newMeal = { ...data, id: highestId + 1 };
    meals.push(newMeal);
    return newMeal;
  },

  async updateMeal(id: number, data: Omit<Meal, "id">) {
    const index = meals.findIndex((item) => item.id === id);

    Object.assign(meals[index], data);
    return meals[index];
  },

  async deleteMeal(id: number) {
    const index = meals.findIndex((item) => item.id === id);
    meals.splice(index, 1);
  },
});

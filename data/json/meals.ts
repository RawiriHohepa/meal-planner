let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Meal {
  id: number;
  name: string;
  portionIds: string[];
}

export const meals: Meal[] = [
  {
    id: generateId(),
    name: "Mince Wraps",
    portionIds: ["6604d6879a5e5752b37037d8"],
  },
  {
    id: generateId(),
    name: "Chicken Wraps",
    portionIds: ["6604d6879a5e5752b37037d8"],
  },
  {
    id: generateId(),
    name: "Fried Rice",
    portionIds: ["6604d6879a5e5752b37037d8"],
  },
];

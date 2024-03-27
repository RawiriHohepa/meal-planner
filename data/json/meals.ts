let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Meal {
  id: number;
  name: string;
  portionIds: number[];
}

export const meals: Meal[] = [
  {
    id: generateId(),
    name: "Mince Wraps",
    portionIds: [1, 2, 3],
  },
  {
    id: generateId(),
    name: "Chicken Wraps",
    portionIds: [1, 2],
  },
  {
    id: generateId(),
    name: "Fried Rice",
    portionIds: [2, 3],
  },
];

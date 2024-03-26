let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Meal {
  id: number;
  name: string;
}

export const meals: Meal[] = [
  {
    id: generateId(),
    name: "Mince Wraps",
  },
  {
    id: generateId(),
    name: "Chicken Wraps",
  },
  {
    id: generateId(),
    name: "Fried Rice",
  },
];

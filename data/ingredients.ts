let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Ingredient {
  id: number;
  name: string;
}

export const ingredients: Ingredient[] = [
  {
    id: generateId(),
    name: "Tomato",
  },
  {
    id: generateId(),
    name: "Mince",
  },
  {
    id: generateId(),
    name: "Coconut Cream",
  },
];

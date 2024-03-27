let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Portion {
  id: number;
  ingredientId: string;
  amount: number;
}

export const portions: Portion[] = [
  {
    id: generateId(),
    ingredientId: "65a9a2758e5f294e4f883831",
    amount: 1,
  },
  {
    id: generateId(),
    ingredientId: "65a9a2758e5f294e4f883831",
    amount: 2,
  },
  {
    id: generateId(),
    ingredientId: "65a9a2758e5f294e4f883831",
    amount: 3,
  },
];

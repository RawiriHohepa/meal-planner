let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Portion {
  id: number;
  ingredientId: number;
  amount: number;
}

export const portions: Portion[] = [
  {
    id: generateId(),
    ingredientId: 1,
    amount: 1,
  },
  {
    id: generateId(),
    ingredientId: 2,
    amount: 2,
  },
  {
    id: generateId(),
    ingredientId: 3,
    amount: 3,
  },
];

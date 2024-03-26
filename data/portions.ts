let nextId = 1;
function generateId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}

export interface Portion {
  id: number;
}

export const portions: Portion[] = [
  {
    id: generateId(),
  },
  {
    id: generateId(),
  },
  {
    id: generateId(),
  },
];

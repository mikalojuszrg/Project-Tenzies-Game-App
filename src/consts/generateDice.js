import { nanoid } from "nanoid";

export const generateDice = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
};

export const allNewDice = () => {
  const array = Array(10)
    .fill()
    .map(() => generateDice());
  return array;
};

import styles from "./GameBoard.module.scss";
import { nanoid } from "nanoid";
import classNames from "classnames";
import Die from "../Die/Die";
import { useState } from "react";

const cn = classNames.bind(styles);

const allNewDice = () => {
  const array = Array(10)
    .fill()
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  return array;
};

const GameBoard = () => {
  const [diceNumbers, setDiceNumbers] = useState(() => allNewDice());

  const handleDiceNumbers = () => {
    setDiceNumbers(allNewDice());
  };

  return (
    <main className={cn(styles.game)}>
      <div className={cn(styles.game__board)}>
        <div className={cn(styles.game__dices)}>
          {diceNumbers.map((number) => (
            <Die isHeld={number.isHeld} key={number.id} value={number.value} />
          ))}
        </div>
        <button onClick={handleDiceNumbers} className={cn(styles.game__button)}>
          Roll
        </button>
      </div>
    </main>
  );
};

export default GameBoard;

import styles from "./GameBoard.module.scss";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import classNames from "classnames";
import Die from "../Die/Die";
import { useState } from "react";
import { useEffect } from "react";

const cn = classNames.bind(styles);

const generateDice = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
};

const allNewDice = () => {
  const array = Array(10)
    .fill()
    .map(() => generateDice());
  return array;
};

const GameBoard = () => {
  const [diceNumbers, setDiceNumbers] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    if (
      diceNumbers.filter((dice) => dice.isHeld === true).length === 10 &&
      diceNumbers.every((dice) => dice.value === diceNumbers[0].value)
    ) {
      setTenzies((prevValue) => !prevValue);
    }
    console.log(diceNumbers);
  }, [diceNumbers]);

  const handleDiceNumbers = () => {
    setDiceNumbers((prevArray) =>
      prevArray.map((die) => {
        if (die.isHeld === true) {
          return { ...die };
        } else {
          return generateDice();
        }
      })
    );
    if (diceNumbers.filter((dice) => dice.isHeld === true).length === 10) {
      setDiceNumbers(allNewDice());
      setTenzies(false);
    }
  };

  const holdDice = (id) => {
    setDiceNumbers((oldAray) =>
      oldAray.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      })
    );
  };

  return (
    <main className={cn(styles.game)}>
      {tenzies && <Confetti />}
      <div className={cn(styles.game__board)}>
        <h1 className={cn(styles.game__title)}>Tenzies</h1>
        <p className={cn(styles.game__description)}>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className={cn(styles.game__dices)}>
          {diceNumbers.map((number) => (
            <Die
              holdDice={() => holdDice(number.id)}
              isHeld={number.isHeld}
              key={number.id}
              value={number.value}
            />
          ))}
        </div>
        <button onClick={handleDiceNumbers} className={cn(styles.game__button)}>
          {tenzies ? "New game" : "Roll"}
        </button>
      </div>
    </main>
  );
};

export default GameBoard;

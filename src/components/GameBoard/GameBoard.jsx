import styles from "./GameBoard.module.scss";
import Confetti from "react-confetti";
import classNames from "classnames";
import Die from "../Die/Die";
import { useState } from "react";
import { useEffect } from "react";
import { allNewDice, generateDice } from "../../consts/generateDice";

const cn = classNames.bind(styles);

const GameBoard = () => {
  const [diceNumbers, setDiceNumbers] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [timeArray, setTimeArray] = useState([]);

  useEffect(() => {
    if (
      diceNumbers.filter((dice) => dice.isHeld === true).length === 10 &&
      diceNumbers.every((dice) => dice.value === diceNumbers[0].value)
    ) {
      setTenzies((prevValue) => !prevValue);
      setTimerOn(false);
    }
  }, [diceNumbers]);

  useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerOn]);

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
      setTimeArray((prevTimearray) => {
        localStorage.setItem(
          "Play time",
          JSON.stringify([...prevTimearray, timer])
        );
        return [...prevTimearray, timer];
      });
      setDiceNumbers(allNewDice());
      setTenzies(false);
      setRollCount(-1);
      setTimerOn(true);
      setTimer(0);
    }
    setRollCount((prevCount) => prevCount + 1);
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
        <p className={cn(styles["game__timer-count"])}>Time: {timer}s</p>
        <p className={cn(styles["game__roll-count"])}>Rolled: {rollCount}</p>
        <button onClick={handleDiceNumbers} className={cn(styles.game__button)}>
          {tenzies ? "New game" : "Roll"}
        </button>
      </div>
    </main>
  );
};

export default GameBoard;

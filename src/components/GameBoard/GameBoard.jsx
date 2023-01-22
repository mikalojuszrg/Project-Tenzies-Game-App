import styles from "./GameBoard.module.scss";
import classNames from "classnames";
import Die from "../Die/Die";

const cn = classNames.bind(styles);

const GameBoard = () => {
  return (
    <main className={cn(styles.game)}>
      <div className={cn(styles.game__board)}>
        <div className={cn(styles.game__dices)}>
          <Die value="1"></Die>
          <Die value="2"></Die>
          <Die value="2"></Die>
          <Die value="2"></Die>
          <Die value="3"></Die>
          <Die value="3"></Die>
          <Die value="3"></Die>
          <Die value="4"></Die>
          <Die value="5"></Die>
          <Die value="6"></Die>
        </div>
      </div>
    </main>
  );
};

export default GameBoard;

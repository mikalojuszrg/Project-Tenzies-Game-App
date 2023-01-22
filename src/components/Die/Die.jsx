import styles from "./Die.module.scss";
import classNames from "classnames";

const cn = classNames.bind(styles);

const Die = ({ value, isHeld }) => {
  return (
    <div
      className={
        isHeld
          ? cn(styles.die, styles["die--active"])
          : cn(styles.die, styles["die--inactive"])
      }
    >
      {value}
    </div>
  );
};

export default Die;

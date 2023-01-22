import styles from "./Die.module.scss";
import classNames from "classnames";

const cn = classNames.bind(styles);

const Die = ({ value }) => {
  return <div className={cn(styles.die)}>{value}</div>;
};

export default Die;

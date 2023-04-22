import React from "react";
import type { SquareProps } from "../../../../lib/types/components/games/tictactoe.types";

import styles from "./TicTacToe.module.scss";

const Square: React.FC<SquareProps> = ({ onClick, value }) => {
  return (
    <button type="button" className={styles.square} onClick={onClick}>
      {value}
    </button>
  );
};
export default Square;

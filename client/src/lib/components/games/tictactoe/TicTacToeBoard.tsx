import type { ReactNode } from "react";

import type { BoardProps } from "../../../../lib/types/components/games/tictactoe.types";

import Square from "./Square";
import styles from "./TicTacToe.module.scss";
import React from "react";

const TicTacToeBoard: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (i: number): ReactNode => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };
//Render the square boxes
  return (
    <div className={styles.container}>
      <div className={styles["board-row"]}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles["board-row"]}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles["board-row"]}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default TicTacToeBoard;

import { useState } from "react";

import type { History } from "../../../../lib/types/components/games/tictactoe.types";

import { calculateWinner } from "./helper";
import styles from "./TicTacToe.module.scss";
import TicTacToeBoard from "./TicTacToeBoard";
import React from "react";

const TicTacToe: React.FC = () => {
  const initialHistory: History[] = [
    {
      squares: Array(9).fill(null),
    },
  ];

  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<History[]>(initialHistory);
  const [showPlayerSelection, setShowPlayerSelection] = useState(true);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
/* Logic of the game*/
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O"; //decide next player
    setHistory(
      newHistory.concat([
        {
          squares,
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    setShowPlayerSelection(false);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let isStepLeft = true;
  history.forEach((step) => {
    isStepLeft = step.squares.some((square) => square === null);
  });

  let status; //Declare the status of game upon completion
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isStepLeft) {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  } else {
    status = "Nobody won :(";
  }

  return ( 
    <div className={styles.game}> 
      {showPlayerSelection ? (
        <div className={styles.players}>
          <button
            type="button"
            onClick={() => {
              setXIsNext(true);
              setShowPlayerSelection(false);
            }}
          >
            Player X 
          </button>
          <button
            type="button"
            onClick={() => {
              setXIsNext(false);
              setShowPlayerSelection(false);
            }}
          >
            Player O
          </button> 
        </div>
      ) : (
        <div className={styles.spacer} />
      )}
      <div className={styles["game-board"]}>
        <TicTacToeBoard
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className={styles["game-info"]}>
        <div>{status}</div>
        {(winner || !isStepLeft) && (
          <button
            type="button"
            onClick={() => {
              jumpTo(0);
              setHistory(initialHistory);
              setShowPlayerSelection(true);
            }}
          >
            Start new game
          </button>  //button to start game
        )}
      </div>
    </div>
  );
};

export default TicTacToe;

import { Container } from "@chakra-ui/react";
import { useReducer } from "react";

import type {
  Board,
  Player,
  Action,
  State,
} from "../../../../lib/types/components/games/connect4.types";

import Cell from "./Cell";
import Column from "./Column";
import connect4Styles from "./styles/connect4.module.scss";
import WinnerModal from "./WinnerModal";
import React from "react";

/**
 * This method is used to generate initial empty board
 * @returns The initial board
 */
const generateBoard = (): Board =>
  Array(7)
    .fill(undefined)
    .map(() => Array(6).fill(undefined));

/**
 * This method is used to update the board based on the user action
 * @param board saved board state
 * @param playedColumn describes the column on which user clicked
 * @param currentPlayer describes which player has played
 * @returns the updated board
 */
const generateNewBoard = (
  board: Board,
  playedColumn: number,
  currentPlayer: Player
): Board => {
  return board.map((column, i) => {
    if (i === playedColumn) {
      const newColumn = [...column];
      for (let index = newColumn.length - 1; index >= 0; index -= 1) {
        if (newColumn[index] === undefined) {
          newColumn[index] = currentPlayer;
          break;
        }
      }
      return newColumn;
    }
    return column;
  });
};

/**
 * This method is used to check if 4 dots have been connected or not in staright line in vertical and horizontal
 * @param gameBoard current game board
 * @param player is current player
 * @returns true if 4 dots have been connected
 */
const checkStraightLine = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = 5; j >= 2; j -= 1) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i][j - 1] === player &&
        gameBoard[i][j - 2] === player &&
        gameBoard[i][j - 3] === player
      ) {
        return true;
      }
      if (
        i < 3 &&
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j] === player &&
        gameBoard[i + 2][j] === player &&
        gameBoard[i + 3][j] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

/**
 * This method is used to check if the dots have been connected diagonally from left to right and right to left
 * @param gameBoard current gameBoard
 * @param player current player
 * @returns true if 4 dots have been connected diagonally
 */
const checkDiagonally = (gameBoard: Board, player: Player) => {
  for (let i = 0; i < 4; i += 1) {
    for (let j = 5; j > 2; j -= 1) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j - 1] === player &&
        gameBoard[i + 2][j - 2] === player &&
        gameBoard[i + 3][j - 3] === player
      ) {
        return true;
      }
    }
    for (let j = 0; j < 3; j += 1) {
      if (
        gameBoard[i][j] === player &&
        gameBoard[i + 1][j + 1] === player &&
        gameBoard[i + 2][j + 2] === player &&
        gameBoard[i + 3][j + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

/**
 * This method is used to check if the game is finished or not
 * @param board is current board state
 * @param player is current player
 * @returns if there is a winner or not
 */
const isWinner = (board: Board, player: Player) => {
  let result = false;
  result = checkStraightLine(board, player);
  if (!result) result = checkDiagonally(board, player);
  return result;
};

/**
 * This method is used to set the initial state
 * @param player is current player
 * @returns current state of the game
 */
const initState = (player: Player): State => {
  return {
    currentPlayer: player,
    winner: null,
    board: generateBoard(),
  };
};

/**
 * This method is used to update the turn or reset the game
 * @param state is current state
 * @param action is either turn or reset
 * @returns state or error
 */
const play = (state: State, action: Action): State => {
  switch (action.type) {
    case "turn": {
      const column = state.board[action.payload];
      if (!column.some((cell) => cell === undefined)) {
        return state;
      }
      const newBoard = generateNewBoard(
        state.board,
        action.payload,
        state.currentPlayer
      );
      const currentPlayerWins = isWinner(newBoard, state.currentPlayer);
      if (currentPlayerWins) {
        return {
          ...state,
          winner: state.currentPlayer,
          board: newBoard,
        };
      }
      return {
        ...state,
        currentPlayer: state.currentPlayer === "red" ? "yellow" : "red",
        board: newBoard,
      };
    }
    case "reset":
      return initState(action.payload);
    default:
      throw new Error();
  }
};

/**
 * This component is used to create and render the main connect4 component
 * @returns connect4 component
 */
const Connect4 = () => {
  const [state, dispatch] = useReducer(play, "red", initState);

  /**
   * This method is used to reset the game
   * @param player current player
   */
  const resetGame = (player: Player) => {
    dispatch({ type: "reset", payload: player });
  };

  return (
    <Container className={connect4Styles.App}>
      {state.winner && (
        <WinnerModal winner={state.winner} clickFunction={resetGame} />
      )}
      <Container className={connect4Styles.Turn}>
        <Container className={connect4Styles.TurnText}>Player turn:</Container>
        <Cell Disk={state.currentPlayer} size={5} />
      </Container>
      <Container className={connect4Styles.Board}>
        {state.board.map((column, i) => (
          <Column
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            column={column}
            onClick={() => dispatch({ type: "turn", payload: i })}
          />
        ))}
      </Container>
    </Container>
  );
};
export default Connect4;

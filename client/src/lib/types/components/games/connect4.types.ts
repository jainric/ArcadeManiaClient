export type Player = "red" | "yellow";
export type Disk = undefined | Player;
export type Board = Disk[][];

/**
 * type defining which user turn and reset when game finishes
 */
export type Action =
  | {
      type: "turn";
      payload: number;
    }
  | {
      type: "reset";
      payload: Player;
    };

/**
 * props for connect4 game main component
 */
export interface Connect4Props {
  play: boolean;
  gameOver: boolean;
  count: number;
  score: number;
  rows: number;
  columns: number;
  dropAnimationRate: number;
  winAnimationRate: number;
}

/**
 * props specific to column in connect4 game
 */
export interface Connect4GameColumnProps {
  column: Disk[];
  onClick: () => void;
}

/**
 * state defining winner,  board status and currentPlayer based on turn
 */
export interface State {
  currentPlayer: Player;
  winner: Player | null;
  board: Board;
}

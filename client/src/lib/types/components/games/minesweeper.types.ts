import type { Coordinate, GameEntity, Matrix } from "./games.common";

/**
 * Minesweeper Game Props
 */
export interface MinesweeperGameProps extends Matrix, GameEntity {
  bombs: number;
}

/**
 * Minesweeper Cell Data
 */
export interface MinesweeperCellData {
  visible: boolean;
  value: number;
}

/**
 * Minesweeper Game Status
 */
export enum MinesweeperGameStatus {
  WIN,
  LOS,
}

/**
 * Minesweeper Cell Props
 */
export interface MinesweeperCellProps {
  value: number;
  show: boolean;
  coordinate: Coordinate;
  unhide: (coordinate: Coordinate, value: number) => void;
  endGame: () => void;
}

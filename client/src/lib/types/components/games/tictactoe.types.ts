export type SquareType = "X" | "O" | null;

/**
 * SquareProps
 */
export interface SquareProps {
  value: SquareType;
  onClick(): void;
}

/**
 * BoardProps
 */
export interface BoardProps {
  squares: SquareType[];
  onClick(i: number): void;
}

/**
 * History
 */
export interface History {
  squares: SquareType[];
}

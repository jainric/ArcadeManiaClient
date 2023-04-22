/**
 * Game Entity.
 */
export type GameEntity = {
  gameId: number;
};

/**
 * Coordinate.
 */
export interface Coordinate {
  x: number;
  y: number;
}

/**
 * Flag.
 */
export interface Flag {
  flag: boolean;
}

/**
 * Score.
 */
export interface Score {
  score: number;
}

/**
 * Matrix.
 */
export interface Matrix {
  rows: number;
  columns: number;
}

/**
 * Unary Function
 */
export type UnaryFunction<T, R> = (value: T) => R;

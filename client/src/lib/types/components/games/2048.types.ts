import type { Coordinate, GameEntity, Matrix } from "./games.common";

/**
 * _2048 Tile Data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _2048TileData = {
  coordinate: Coordinate;
  value: number;
};

/**
 * Swiped Grid Data.
 */
export type SwipedGridData = {
  swipedScore: number;
  swipedGrid: number[][];
};

/**
 * Direction.
 */
export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

/**
 * 2048 Props.
 */
export type Game2048Props = Matrix & GameEntity;

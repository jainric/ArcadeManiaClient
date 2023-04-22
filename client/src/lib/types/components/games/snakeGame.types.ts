/**
 * props specific to food in snake game which defines the coordinates
 */
export interface FoodProps {
  coordinates: number[];
}

/**
 * props specific to snake in snake game which defines the coordinates
 */
export interface SnakeProps {
  SnakeCoordinates: number[][];
}

/**
 * props for snake game main component
 */
export interface SnakeGameProps {
  food: number[];
  speed: number;
  pause: boolean;
  play: boolean;
  gameOver: string;
  direction: string;
  snakeDots: number[][];
}

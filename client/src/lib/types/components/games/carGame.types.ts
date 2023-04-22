import type { AnyFunction } from "@chakra-ui/utils";

/**
 * Required props for BlueCar
 */
export interface BlueCar {
  show: boolean;
  blueCarLeft: number;
  setBlueCarLeft: AnyFunction;
  count: number;
  setCount: AnyFunction;
}

/**
 * Required props for car game main component
 */
export interface CarGameProps {
  play: boolean;
  gameOver: boolean;
  count: number;
  score: number;
  redCarLeft: number;
  blueCarLeft: number;
  intervalId: ReturnType<typeof setTimeout>;
}

/**
 * Required props for results card
 */
export interface ResultCardProps {
  score: number;
  buttonAction: AnyFunction;
}

/**
 * Game Status Message Props
 */
export interface GameStatusMessageProps {
  show: boolean;
  win: boolean;
  playAgain: () => void;
  score: number;
}

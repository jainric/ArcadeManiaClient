import { FaBomb, FaCarAlt, FaKeyboard } from "react-icons/fa";
import {
  GiCard6Spades,
  GiSnakeSpiral,
  GiSuicide,
  GiTicTacToe,
} from "react-icons/gi";
import { RiNumber2 } from "react-icons/ri";
import { TbBuildingBridge2 } from "react-icons/tb";

import type { GameInfo, GameInfoCollection } from "../../../lib/types/components/common";

import Game2048 from "./2048/Game2048";
import CarGame from "./carcrash/CarGame";
import Connect4 from "./connect4/Connect4";
import Hangman from "./hangman/Hangman";
import MemoryGame from "./memorygame/MemoryGame";
import Minesweeper from "./minesweeper/Minesweeper";
import RockPaperScissors from "./rockpaperscissors/RockPaperScissors";
import SnakeGame from "./snakegame/SnakeGame";
import TicTacToe from "./tictactoe/TicTacToe";
import TypingSpeed from "./typingspeed/typingspeed";
import Betcard from './betcard/BetCard';
import React from "react";

/**
 * Collection of all the games present in the application.
 */
const games: GameInfoCollection = {
  1: {
    id: 1,
    name: "2048",
    component: <Game2048 rows={4} columns={4} gameId={1} />,
    image: "images/2048.png",
    altImage: "images/2048.png",
    description:
      "Slide the numbered tiles on a grid to combine them to create a tile with the number 2048 to win the game!",
    helpContent:
      "Slide the numbered tiles on a grid to combine them to create a tile with the number 2048 to win the game!",
    icon: RiNumber2,
  },
  2: {
    id: 2,
    name: "Snake Game",
    component: <SnakeGame />,
    image: "images/Snake_Game.png",
    altImage: "images/Snake_Game.png",
    description:
      "Use keyboard arrows to move the snake to eat the frog within the boundaries to win the maximum score!",
    helpContent:
      "Use keyboard arrows to move the snake to eat the frog within the boundaries to win the maximum score!",
    icon: GiSnakeSpiral,
  },
  3: {
    id: 3,
    name: "Car Game",
    component: <CarGame />,
    image: "images/carGame.png",
    altImage: "images/race-car.gif",
    description:
      "Use left and right arrow buttons to escape the red car from blue car to win the game!",
    helpContent:
      "Use left and right arrow buttons to escape the red car from blue car to win the game!",
    icon: FaCarAlt,
  },
  4: {
    id: 4,
    name: "Connect4",
    component: <Connect4 />,
    image: "images/Connect4.png",
    altImage: "images/Connect4.png",
    description:
      "This is a multi player game, click on the row to insert respective disks into the columns, connect any 4 dots and win the game",
    helpContent:
      "This is a multi player game, click on the row to insert respective disks into the columns, connect any 4 dots and win the game",
    icon: TbBuildingBridge2,
  },
  5: {
    id: 5,
    name: "Minesweeper",
    component: <Minesweeper rows={10} columns={10} bombs={10} gameId={5} />,
    image: "images/Minesweeper.png",
    altImage: "images/Minesweeper.png",
    description:
      "Classic implementation of the Minesweeper game in Javascript with flag the cell feature.",
    helpContent:
      "Minesweeper is a game where mines are hidden in a grid of squares. Safe squares have numbers telling you how many mines touch the square. You can use the number clues to solve the game by opening all of the safe squares. If you click on a mine you lose the game!",
    icon: FaBomb,
  },
  6: {
    id: 6,
    name: "Tic Tac Toe",
    component: <TicTacToe />,
    image: "images/TicTacToe.png",
    altImage: "images/TicTacToe.png",
    description:
      "Two players take turns in drawing either an ` O' or an ` X' in one square of a grid consisting of nine squares.",
    helpContent:
      "Two players take turns in drawing either an ` O' or an ` X' in one square of a grid consisting of nine squares.",
    icon: GiTicTacToe,
  },
  7: {
    id: 7,
    name: "Typing Speed",
    component: <TypingSpeed />,
    image: "images/TypingSpeed.png",
    altImage: "images/TypingSpeed.png",
    description:
      "Requires the player to quickly and precisely type in the words from sentence given",
    helpContent:
      "Requires the player to quickly and precisely type in the words from sentence given",
    icon: FaKeyboard,
  },
  8: {
    id: 8,
    name: "Memory Game",
    component: <MemoryGame />,
    image: "images/memory.png",
    altImage: "images/memory.png",
    description:
      "Flip cards and match the correct images to check how fast the memory can process",
    helpContent:
      "This game will check the ability to remember images by flipping cards",
    icon: GiCard6Spades,
  },
  9: {
    id: 9,
    name: "Hangman",
    component: <Hangman />,
    image: "images/Hangman.png",
    altImage: "images/Hangman.png",
    description:
      "System thinks of a word and the player tries to guess it by suggesting letters within a certain number of guesses",
    helpContent:
      "System thinks of a word and the player tries to guess it by suggesting letters within a certain number of guesses",
    icon: GiSuicide,
  },
  10: {
    id: 10,
    name: "Rock Paper Scissors",
    component: <RockPaperScissors />,
    image: "images/rockpaperscissors.png",
    altImage: "images/rockpaperscissors.png",
    description:
      "user should select any one option and the system will generate one option",
    helpContent:
      "user should select any one option and the system will generate one option",
    icon: GiSuicide,
  },
  11: {
    id: 11,
    name: "Bet Card",
    component: <Betcard />,
    image: "images/card.png",
    altImage: "images/card.png",
    description:
      "This game lets the player hit or skip and bet for the cards with the system",
    helpContent:
    "This game lets the player hit or skip and bet for the cards with the system",
    icon: GiCard6Spades,
  },
};

/**
 * Get all the games and their info
 *
 * @param gameIds gameids to filter
 * @returns List of Games and their info
 */
export const getGameInfo = (gameIds: number[] | null = null): GameInfo[] => {
  if (gameIds === null) return Object.values(games);
  return Object.values(games).filter((game:any) => gameIds.includes(game.id));
};

export const isValidGameId = (gameId: number) => {
  return Object.values(games).findIndex((e:any) => e.id === gameId) > -1;
};

export default games;

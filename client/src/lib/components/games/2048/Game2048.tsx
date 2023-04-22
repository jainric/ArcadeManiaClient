import {
  Box,
  Flex,
  Grid,
  useColorModeValue,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { repeat } from "lodash";
import { useEffect, useState } from "react";

import type {
  Game2048Props,
  SwipedGridData,
} from "../../../types/components/games/2048.types";
import type {
  Coordinate,
  UnaryFunction,
} from "../../../types/components/games/games.common";
import GameStatusMessage from "../gameMessage/GameStatusMessage";
import GameScore from "../gameScore/GameScore";
import { getLeaderboard, saveScore } from "../../../../lib/services/leaderboard-service";
import { getAuthState } from "../../../../lib/store/slices/authSlice";
import { setGameLeaderboard } from "../../../../lib/store/slices/leaderboardSlice";
import { useDispatch, useSelector } from "../../../../lib/store/store";
import { isAuthenticated } from "../../../../lib/utils/tokenUtils";

import Cell2048 from "./cell2048/Cell2048";
import {
  isExist,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "./utils/swipeUtils";
import React from "react";

/**
 * Generate a random value among numbers [2, 4].
 * @returns 2 or 4.
 */
const getRandomValue = (): number => {
  return Math.random() > 0.2 ? 2 : 4;
};

/**
 * Sets a random element for the given matrix.
 *
 * @param game matrix
 * @param rows number of rows
 * @param columns number of columns
 */
const setRandomElement = (
  game: number[][],
  rows: number,
  columns: number
): void => {
  const emptyCells: Coordinate[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns; c += 1) {
      if (game[r][c] === 0) {
        emptyCells.push({ x: r, y: c });
      }
    }
  }

  if (emptyCells.length === 0) return;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { x, y } = emptyCells[randomIndex];
  game[x][y] = getRandomValue();
};

/**
 * Creates a game board to play 2048.
 *
 * @param rows number of rows
 * @param columns number of columns
 * @returns matrix
 */
const createGame = (rows: number, columns: number): number[][] => {
  const game: number[][] = new Array(rows);
  for (let i = 0; i < rows; i += 1) {
    game[i] = new Array(columns);
    for (let j = 0; j < columns; j += 1) {
      game[i][j] = 0;
    }
  }
  setRandomElement(game, rows, columns);
  setRandomElement(game, rows, columns);
  return game;
};

/**
 * Game2048 Board Component.
 *
 * @param Game2048Props props
 * @returns Game2048 Board.
 */
const Game2048: React.FC<Game2048Props> = ({ gameId, rows, columns }) => {
  const dispatch = useDispatch();
  const [game, setGame] = useState(createGame(rows, columns));
  const [score, setScore] = useState(0);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [win, setWin] = useState(false);
  const authState = useSelector(getAuthState);

  const KEY_DIRECTION_MAP = new Map([
    ["ArrowLeft", swipeLeft],
    ["ArrowUp", swipeUp],
    ["ArrowRight", swipeRight],
    ["ArrowDown", swipeDown],
  ]);

  /**
   * Play Again.
   */
  const playAgain = () => {
    setScore(0);
    setShowGameMessage(false);
    setWin(false);
    setGame(createGame(rows, columns));
  };

  /**
   * Save the score via API.
   * @param gameScore score to save
   */
  const saveGameScores = (gameScore: number) => {
    if (isAuthenticated(authState)) {
      saveScore(gameId, gameScore).then(() => {
        getLeaderboard(gameId).then((leaderboard) =>
          dispatch(
            setGameLeaderboard({
              gameId,
              data: leaderboard,
            })
          )
        );
      });
    }
  };

  /**
   * End the game.
   */
  const endGame = (didWin?: boolean) => {
    setWin(didWin ?? false);
    setShowGameMessage(true);
    saveGameScores(score);
  };

  /**
   * Update the score in the state.
   * @param newScore score to update.
   */
  const addScore = (newScore: number) => {
    setScore(score + newScore);
  };

  /**
   * Clone the current game.
   *
   * @returns matrix
   */
  const cloneGame = () => {
    return structuredClone(game);
  };

  /**
   * Check if the game is over.
   *
   * @param swipedGrid matrix to validate against.
   * @returns true, if the game ends.
   */
  const checkGameOver = (swipedGrid: number[][]) => {
    const currentData = JSON.stringify(structuredClone(swipedGrid));

    if (currentData !== JSON.stringify(swipeLeft(cloneGame()).swipedGrid)) {
      return false;
    }
    if (currentData !== JSON.stringify(swipeRight(cloneGame()).swipedGrid)) {
      return false;
    }
    if (currentData !== JSON.stringify(swipeUp(cloneGame()).swipedGrid)) {
      return false;
    }
    if (currentData !== JSON.stringify(swipeDown(cloneGame()).swipedGrid)) {
      return false;
    }

    return true;
  };

  /**
   * Apply the operation on game based on the keyboard action performed.
   *
   * @param swipeFunc Function to apply based on keyboard input
   */
  const swipe = (
    swipeFunc: UnaryFunction<number[][], SwipedGridData> | undefined
  ) => {
    if (swipeFunc === undefined || showGameMessage) return;

    const oldData = structuredClone(game);
    const { swipedGrid, swipedScore } = swipeFunc(game);
    addScore(swipedScore);

    if (JSON.stringify(oldData) !== JSON.stringify(swipedGrid)) {
      if (isExist(swipedGrid, 2048)) {
        endGame(true);
      } else {
        setRandomElement(swipedGrid, rows, columns);
      }
    }
    if (!isExist(oldData, 0) && checkGameOver(swipedGrid)) {
      endGame(false);
    }

    setGame(swipedGrid);
  };

  /**
   * Invoked relavent Swiper Function based on keyboard event.
   *
   * @param key KeyboardEvent key.
   */
  const handleKeyPress = ({ key }: KeyboardEvent) => {
    if (!KEY_DIRECTION_MAP.has(key)) {
      return;
    }

    swipe(KEY_DIRECTION_MAP.get(key));
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      // Cleanup event listener
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Stack>
      <VStack>
        <GameScore score={score} />
        <Flex mt={0}>
          <Box
            bg={useColorModeValue("white", "gray.800")}
            color="white"
            borderRadius="lg"
            rounded="xl"
            boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
            mx={2}
            mb={2}
          >
            <Box pos="relative">
              <GameStatusMessage
                show={showGameMessage}
                win={win}
                playAgain={playAgain}
                score={score}
              />
              <Grid
                gridTemplateRows={repeat("1fr ", rows)}
                gridTemplateColumns={repeat("1fr ", columns)}
                filter="var(--chakra-backdrop-blur)"
                backdropBlur={showGameMessage ? "sm" : undefined}
                transition="450ms filter linear"
                bg="#bcac9f"
                gap="2"
                p="2"
                borderRadius="4px"
              >
                {game.map((eachRow, rowIndex) =>
                  eachRow.map((value, columnIndex) => {
                    const key = rowIndex * columns + columnIndex;
                    const coordinate: Coordinate = {
                      x: rowIndex,
                      y: columnIndex,
                    };
                    return (
                      <Cell2048
                        value={value}
                        key={key}
                        coordinate={coordinate}
                      />
                    );
                  })
                )}
              </Grid>
            </Box>
          </Box>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default Game2048;

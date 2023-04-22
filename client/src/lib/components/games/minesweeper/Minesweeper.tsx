import {
  Box,
  Flex,
  Grid,
  useColorModeValue,
  Stack,
  VStack,
} from "@chakra-ui/react";
import _, { repeat } from "lodash";
import { useState } from "react";

import {
  getLeaderboard,
  saveScore,
} from "../../../services/leaderboard-service";
import GameStatusMessage from "../gameMessage/GameStatusMessage";
import GameScore from "../gameScore/GameScore";
import { getAuthState } from "../../../../lib/store/slices/authSlice";
import { setGameLeaderboard } from "../../../../lib/store/slices/leaderboardSlice";
import { useDispatch, useSelector } from "../../../../lib/store/store";
import type { Coordinate } from "../../../../lib/types/components/games/games.common";
import type {
  MinesweeperGameProps,
  MinesweeperCellData,
} from "../../../../lib/types/components/games/minesweeper.types";
import { isAuthenticated } from "../../../../lib/utils/tokenUtils";

import MinesweeperCell from "./minesweeperCell/MinesweeperCell";
import React from "react";

/**
 * Neighbours to the current cell.
 */
const neighbours: Coordinate[] = [
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

/**
 * Set bombs in cells randomly for the given game matrix.
 *
 * @param game game matrix
 * @param bombs number of bombs
 */
const setBombsRandomly = (
  game: MinesweeperCellData[][],
  bombs: number
): void => {
  const rows = game.length;
  const columns = game[0].length;
  const max = rows * columns;
  const numbers = new Set();
  while (bombs > 0) {
    const index = _.random(max - 1, false);
    if (!numbers.has(index)) {
      const row = Math.floor(index / columns);
      const col = index % columns;
      game[row][col] = {
        visible: false,
        value: -1,
      };
      bombs -= 1;
      numbers.add(index);
    }
  }
};

/**
 * Create the game board with given parameters
 *
 * @param rows number of rows in board.
 * @param columns number of columns in board.
 * @param bombs number of bombs to set.
 * @returns
 */
const createGame = (
  rows: number,
  columns: number,
  bombs: number
): MinesweeperCellData[][] => {
  const game: MinesweeperCellData[][] = new Array(rows);
  for (let i = 0; i < rows; i += 1) {
    game[i] = new Array(columns);
    for (let j = 0; j < columns; j += 1) {
      game[i][j] = {
        visible: true,
        value: 0,
      };
    }
  }

  setBombsRandomly(game, bombs);

  game.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell.value === -1) return;
      let bombsCount = 0;
      neighbours.forEach(({ x, y }) => {
        const r = x + rowIndex;
        const c = y + colIndex;
        if (r in game && c in game[r] && game[r][c].value === -1) {
          bombsCount += 1;
        }
      });
      game[rowIndex][colIndex] = {
        visible: false,
        value: bombsCount,
      };
    })
  );
  return game;
};

/**
 * Minesweeper Game Board Component
 *
 * @param MinesweeperGameProps props
 * @returns Minesweeper
 */
const Minesweeper: React.FC<MinesweeperGameProps> = ({
  gameId,
  rows,
  columns,
  bombs,
}) => {
  const dispatch = useDispatch();
  const [game, setGame] = useState(createGame(rows, columns, bombs));
  const [score, setScore] = useState(0);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [win, setWin] = useState(false);
  const authState = useSelector(getAuthState);

  /**
   * Update the game state
   */
  const updateGame = () => {
    setGame(_.cloneDeep(game));
  };

  /**
   * Show all the cells.
   */
  const showAll = () => {
    game.forEach((row) =>
      row.forEach((column) => {
        column.visible = true;
      })
    );
    updateGame();
  };

  /**
   * Counts the number of visible cells.
   *
   * @returns score
   */
  const countVisible = () => {
    return game.reduce(
      (prev, row) =>
        prev +
        row.reduce((colPrev, column) => colPrev + (column.visible ? 1 : 0), 0),
      0
    );
  };

  /**
   * Save score on the backend via API
   *
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
   * Ends the game.
   *
   * @param didWin if the user won
   */
  const endGame = (didWin?: boolean) => {
    const gameScore = countVisible() + (didWin ? bombs : 0);
    setScore(gameScore);
    setWin(didWin ?? false);
    showAll();
    setShowGameMessage(true);
    saveGameScores(gameScore);
  };

  /**
   * Check if the user has won.
   */
  const checkIfWon = () => {
    const maxVisibleCells = rows * columns - bombs;
    const visibleCells = countVisible();

    if (visibleCells === maxVisibleCells) {
      endGame(true);
    }
  };

  /**
   * Play the game again.
   */
  const playAgain = () => {
    setGame(createGame(rows, columns, bombs));
    setScore(0);
    setShowGameMessage(false);
    setWin(false);
  };

  /**
   * Unhides all the valid neighbour cells.
   *
   * @param coordinate Coordinate to trigger unhide at.
   * @param showNeighbours shows all the neighbours.
   */
  const unhideCellAndNeighbours = (
    coordinate: Coordinate,
    showNeighbours: boolean
  ) => {
    game[coordinate.x][coordinate.y] = {
      value: game[coordinate.x][coordinate.y].value,
      visible: true,
    };

    if (showNeighbours) {
      neighbours.forEach((i) => {
        const r = i.x + coordinate.x;
        const c = i.y + coordinate.y;
        if (r in game && c in game[r] && !game[r][c].visible) {
          const neighbourValue = game[r][c].value;
          game[r][c] = {
            visible: true,
            value: neighbourValue,
          };
          if (neighbourValue === 0) {
            unhideCellAndNeighbours({ x: r, y: c }, true);
          }
        }
      });
    }
    updateGame();
  };

  /**
   * Unhides the coordinate and neighbour cells.
   *
   * @param coordinate coordinate clicked
   * @param value value at the current cell
   */
  const unhideCell = (coordinate: Coordinate, value: number) => {
    unhideCellAndNeighbours(coordinate, value === 0);
    setScore(countVisible());
    checkIfWon();
  };

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
                m={2}
                filter="var(--chakra-backdrop-blur)"
                backdropBlur={showGameMessage ? "sm" : undefined}
                transition="450ms filter linear"
              >
                {game.map((eachRow, rowIndex) =>
                  eachRow.map((eachColumn, columnIndex) => {
                    const key = rowIndex * columns + columnIndex;
                    const coordinate: Coordinate = {
                      x: rowIndex,
                      y: columnIndex,
                    };
                    const data = game[rowIndex][columnIndex];
                    return (
                      <MinesweeperCell
                        key={key}
                        coordinate={coordinate}
                        unhide={unhideCell}
                        endGame={endGame}
                        show={data.visible}
                        value={data.value}
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

export default Minesweeper;

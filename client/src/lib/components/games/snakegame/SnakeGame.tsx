import { Button, Center, Container } from "@chakra-ui/react";
import React from "react";
import type { DispatchProp } from "react-redux";
import { connect } from "react-redux";

import { getLeaderboard, saveScore } from "../../../../lib/services/leaderboard-service";
import { setGameLeaderboard } from "../../../../lib/store/slices/leaderboardSlice";
import type { SnakeGameProps } from "../../../../lib/types/components/games/snakeGame.types";
import { getSessionStorageToken } from "../../../../lib/utils/tokenUtils";

import Food from "./Food";
import Snake from "./Snake";
import snakeGameStyles from "./styles/snakeGame.module.scss";
import WinnerModal from "./WinnerModal";

/**
 * This method is used to generate random coordinates
 * @returns random coordinates for frog
 */
const getRandomCoords = () => {
  const min = 1;
  const max = 90;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
  return [x, y];
};

/**
 * initial state of the game
 */
const initialState = {
  food: getRandomCoords(),
  speed: 500,
  pause: false,
  play: false,
  gameOver: "",
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [5, 0],
  ],
};

/**
 * This component renders snake game
 */
class SnakeGame extends React.Component<DispatchProp, SnakeGameProps> {
  constructor(props: DispatchProp) {
    super(props);
    this.state = initialState;
  }

  /**
   * This method is called when the component mounts
   */
  componentDidMount() {
    const { speed } = this.state;
    setInterval(this.moveSnake, speed);
    document.onkeydown = this.onKeyDown;
  }

  /**
   * This method is triggered when the component updates (i.e snake moves)
   */
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  /**
   * This method is used to identify the keyboard key and update the states
   * @param e keyboard event
   */
  onKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        break;
    }
  };

  /**
   * This method is used to update the snake (move snake)
   */
  moveSnake = () => {
    const { snakeDots, direction, play, pause } = this.state;
    const dots = [...snakeDots];
    let head = dots[dots.length - 1];
    switch (direction) {
      case "RIGHT":
        head = [head[0] + 5, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 5, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 5];
        break;
      case "UP":
        head = [head[0], head[1] - 5];
        break;
      default:
        break;
    }
    if (!pause && play) {
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots,
      });
    }
  };

  /**
   * This method is used to check if snake reached the borders
   */
  checkIfOutOfBorders = () => {
    const { snakeDots } = this.state;
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  };

  /**
   * This method is used to check if the snake hit itself
   */
  checkIfCollapsed = () => {
    const { snakeDots } = this.state;
    const snake = [...snakeDots];
    const head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  };

  /**
   * This method is used to update the game scores
   * @param gameScore final score
   */
  saveGameScores = (gameScore: number) => {
    const token = getSessionStorageToken();
    if (token && token !== "") {
      saveScore(2, gameScore).then(() => {
        getLeaderboard(2).then((leaderboard) => {
          const { dispatch } = this.props;
          dispatch(
            setGameLeaderboard({
              gameId: 3,
              data: leaderboard,
            })
          );
        });
      });
    }
  };

  /**
   * This method is used to check if the snake ate frog or not
   */
  checkIfEat = () => {
    const { snakeDots, food } = this.state;
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoords(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  };

  /**
   * This method is used to update the snake length
   */
  enlargeSnake = () => {
    const { snakeDots } = this.state;
    const newSnake = [...snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  };

  /**
   * This method is used to update the speed of the snake
   */
  increaseSpeed = () => {
    const { speed } = this.state;
    if (speed > 100) {
      this.setState({
        speed: speed - 100,
      });
    }
  };

  /**
   * This method is used to update the state on game over
   */
  onGameOver = () => {
    this.setState(initialState);
    const { snakeDots } = this.state;
    this.setState({
      gameOver: `Game Over! Your Score was ${snakeDots.length} Try Again`,
    });
    this.saveGameScores(snakeDots.length);
  };

  /**
   * This method is used to create and render the snake game board
   * @returns the snake game board
   */
  render() {
    const { play, snakeDots, food, pause, gameOver } = this.state;
    let button;
    let modal;
    if (gameOver !== "") modal = <WinnerModal gameOver={gameOver} />;
    /**
     * buttons will be updated based on the play state
     */
    if (play) {
      button = (
        <Button
          bg="blue.400"
          color="white"
          ml={3}
          onClick={() => {
            this.setState({ pause: !pause });
          }}
        >
          {pause ? "Return Game" : "Pause Game"}
        </Button>
      );
    }
    return (
      <Container width={800}>
        <Container mt={2} className="flex my-2 justify-center">
          <Center>
            <Button
              bg="blue.400"
              color="white"
              onClick={() => {
                if (play) {
                  this.setState(initialState);
                } else this.setState({ play: true });
              }}
            >
              {play ? "End Game" : "Play Game"}
            </Button>
            {button}
          </Center>
        </Container>

        <Container className={snakeGameStyles.gameArea}>
          {play ? (
            <>
              <Snake SnakeCoordinates={snakeDots} />
              <Food coordinates={food} />
            </>
          ) : (
            <Container className="text-white font-bold flex items-center">
              {modal}
            </Container>
          )}
        </Container>
      </Container>
    );
  }
}

export default connect()(SnakeGame);

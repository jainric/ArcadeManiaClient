import { Button, Center, Container } from "@chakra-ui/react";
//import Image from "next/image";
import React from "react";
import type { DispatchProp } from "react-redux";
import { connect } from "react-redux";

import { getLeaderboard, saveScore } from "../../../services/leaderboard-service";
import { setGameLeaderboard } from "../../../store/slices/leaderboardSlice";
import type { CarGameProps } from "../../../types/components/games/carGame.types";
import { getSessionStorageToken } from "../../..//utils/tokenUtils";

import BlueCar from "./BlueCar";
import ResultsCard from "./ResultsCard";
import carstyles from "./styles/carCrash.module.scss";

/**
 * This class component is used to create car game main component
 */
class CarGame extends React.Component<DispatchProp, CarGameProps> {
  constructor(props: DispatchProp) {
    super(props);
    this.state = {
      play: false,
      gameOver: false,
      count: 0,
      score: 0,
      redCarLeft: 108,
      blueCarLeft: 108,
      intervalId: setTimeout(() => {}, 1),
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveRedCar = this.moveRedCar.bind(this);
  }

  /**
   * This method will be called when this component is rendered
   */
  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  /**
   * This method will be called when the component is removed
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
    const { intervalId } = this.state;
    clearInterval({ intervalId } as unknown as number);
  }

  /**
   * This method is used to check whether the the blue car hit the red car or not
   */
  gameOver = () => {
    const blueCartopelem = document
      .getElementById("blueCar")
      ?.getElementsByTagName("img")[0];
    if (blueCartopelem) {
      const blueCartop = blueCartopelem.offsetTop;
      const { blueCarLeft, redCarLeft, count, score, intervalId } = this.state;
      if (blueCarLeft === redCarLeft && blueCartop > 510 && blueCartop < 610) {
        clearInterval({ intervalId } as unknown as number);
        this.setState({ play: false, score: count, count: 0, gameOver: true });
        document.removeEventListener("keydown", this.onKeyDown, false);
        this.saveGameScores(score);
      }
    }
  };

  /**
   * This methods is used to save the scores to db
   * @param gameScore holds the final score to save in database
   */
  saveGameScores = (gameScore: number) => {
    const token = getSessionStorageToken();
    if (token && token !== "") {
      saveScore(3, gameScore).then(() => {
        getLeaderboard(3).then((leaderboard) => {
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
   * This method is used to move the car either left or right
   * @param direction to shift in which direction
   */
  moveRedCar = (direction: string) => {
    const { redCarLeft } = this.state;
    if (direction === "RIGHT") {
      if (redCarLeft < 378) {
        this.setState({ redCarLeft: redCarLeft + 90 });
      }
    } else if (redCarLeft > 108) {
      this.setState({ redCarLeft: redCarLeft - 90 });
    }
  };

  /**
   * This method is used to identify the direction of the red car based on the key
   * @param e event of keyboard action
   */
  onKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 39:
        this.moveRedCar("RIGHT");
        break;
      case 37:
        this.moveRedCar("LEFT");
        break;
      default:
        break;
    }
  };

  /**
   * This method is used to set the state when game starts
   */
  startGame = () => {
    this.setState({ gameOver: false });
    this.setState({ play: true });
    this.setState({ intervalId: setInterval(this.gameOver, 1) });
  };

  /**
   * This method is used to save the bluecar left value and this is set from Bluecar component
   * @param value This left value of the Bluecar
   */
  setBlueCarLeft = (value: number) => {
    this.setState({ blueCarLeft: value });
  };

  /**
   * This method is used to update the count
   * @param value is the no.of times redcar escapes bluecar
   */
  setCount = (value: number) => {
    this.setState({ count: value });
  };

  /**
   * This method is used to render the car game component
   * @returns CarGame component
   */
  render() {
    const { score, gameOver, blueCarLeft, count, redCarLeft, play } =
      this.state;
    const gameScore = score;
    let scoreCard;
    let blueCar;
    let redCar;

    if (gameOver) {
      scoreCard = (
        <ResultsCard score={gameScore} buttonAction={this.startGame} />
      );
    }
    // eslint-disable-next-line no-constant-condition
    if (play) {
      blueCar = (
        <BlueCar
          show={!gameOver}
          blueCarLeft={blueCarLeft}
          setBlueCarLeft={this.setBlueCarLeft}
          count={count}
          setCount={this.setCount}
        />
      );
      redCar = (
        <Container id="redCar" className="redCar">
          <img
            src="/images/red.png"
            alt="RedCar"
            width={50}
            height={100}
            className={carstyles.redCar}
            style={{ left: redCarLeft as unknown as number }}
          />
        </Container>
      );
    }
    return (
      <Container>
        <Center>
          <Button mt={2} bg="blue.400" color="white" onClick={this.startGame}>
            Play Game
          </Button>
        </Center>
        <Container id="game" h="600px" className={carstyles.game}>
          {blueCar}
          {redCar}
        </Container>
        {scoreCard}
      </Container>
    );
  }
}

// exporting cargame component by connecting it with dispatchprops
export default connect()(CarGame);

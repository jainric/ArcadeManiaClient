/* eslint-disable react/jsx-no-bind */
import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { PlayButton } from "./PlayButton";
import styles from "./styles/RockPaperScissors.module.scss";
import React from "react";

/**
 * This component is used to create and render rock paper scissors game component
 * @returns RockPaperScissors component
 */
const RockPaperScissors = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [result, setResult] = useState<"YOU WIN" | "YOU LOSE" | "DRAW">();
  const [playerChoice, setPlayerChoice] = useState<
    "paper" | "scissors" | "rock"
  >();
  const [systemChoice, setSystemChoice] = useState<
    "paper" | "scissors" | "rock" | null
  >(null);
  const possibleResults = ["paper", "scissors", "rock"];

  /**
   * This method is used to set the state based on players choice
   * @param choice player choice of button
   */
  const startPlay = (choice: "paper" | "scissors" | "rock") => {
    setIsPlaying(true);
    setPlayerChoice(choice);
    setTimeout(() => {
      const randomResult = Math.floor(Math.random() * possibleResults.length);
      if (possibleResults[randomResult] === "paper") {
        setSystemChoice("paper");
      } else if (possibleResults[randomResult] === "scissors") {
        setSystemChoice("scissors");
      } else {
        setSystemChoice("rock");
      }
    }, 1000);
  };

  /**
   * This method is used to reset the state
   */
  const reset = () => {
    setIsPlaying(false);
    setSystemChoice(null);
    setisDone(false);
    setResult("DRAW");
  };

  /**
   * This method is used to compare the user's choice and system generated choice and update the score
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyResults = () => {
    switch (playerChoice) {
      case "paper":
        if (systemChoice === "rock") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "scissors") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;
      case "scissors":
        if (systemChoice === "paper") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "rock") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;
      case "rock":
        if (systemChoice === "scissors") {
          setResult("YOU WIN");
          setScore(score + 1);
        } else if (systemChoice === "paper") {
          setResult("YOU LOSE");
          setScore(score - 1);
        } else {
          setResult("DRAW");
        }
        break;

      default:
        break;
    }

    setisDone(true);
  };

  /**
   *  This is executed when systemchoice is updated
   */
  useEffect(() => {
    if (systemChoice) {
      setTimeout(() => {
        verifyResults();
      }, 1000);
    }
  }, [systemChoice, verifyResults]);

  /**
   * Returns the component
   */
  return (
    <Container className={styles.container}>
      {!isPlaying ? (
        <Container className={styles.pickContainer}>
          <PlayButton
            disable={isPlaying}
            startPlay={startPlay}
            choice="paper"
          />
          <PlayButton
            disable={isPlaying}
            startPlay={startPlay}
            choice="scissors"
          />
          <PlayButton disable={isPlaying} startPlay={startPlay} choice="rock" />
        </Container>
      ) : (
        <Container className={styles.gamingWrapper}>
          <Container className={styles.gamingContainer}>
            <Container className={styles.playerChoiceContainer}>
              <PlayButton
                disable={isPlaying}
                choice={playerChoice}
                result={result === "YOU WIN"}
              />
              <p>You Picked</p>
            </Container>

            {isDone && (
              <Container className={styles.resultContainer}>
                <p>{result}</p>
                <button type="button" onClick={reset}>
                  PLAY AGAIN
                </button>
              </Container>
            )}

            <Container className={styles.systemChoiceContainer}>
              {!systemChoice ? (
                <span />
              ) : (
                <PlayButton
                  disable={isPlaying}
                  choice={systemChoice}
                  result={result === "YOU LOSE"}
                />
              )}
              <p>System Picked</p>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default RockPaperScissors;

/* eslint-disable no-nested-ternary */
import { Button, Container } from "@chakra-ui/react";
import type { AnyFunction } from "@chakra-ui/utils";
//import Image from "next/image";

import styles from "./styles/RockPaperScissors.module.scss";
import React from "react";

interface ButtonProps {
  startPlay?: AnyFunction;
  disable: boolean;
  choice: "paper" | "scissors" | "rock" | undefined;
  result?: boolean;
}

/**
 * This component is used to render buttons of rock paper and scissors
 * @param startPlay what function needs to be triggered in parent when button is clicked
 * @param disable decides button is in disabled state or not
 * @param choice either rock, paper or scissors
 * @param result who picked the image
 * @returns button component with image
 */
export function PlayButton({
  startPlay,
  disable,
  choice,
  result,
}: ButtonProps) {
  return (
    <Container className={styles.buttonContainer}>
      <Button
        disabled={disable}
        className={
          choice === "paper"
            ? styles.paper
            : choice === "rock"
            ? styles.rock
            : styles.scissors
        }
        onClick={() => {
          if (startPlay) {
            startPlay(choice);
          }
        }}
      >
        <img
          src={`/images/${choice}.png`}
          alt={`image_${choice}`}
          width={125}
          height={125}
        />
      </Button>
      {result && <span />}
    </Container>
  );
}

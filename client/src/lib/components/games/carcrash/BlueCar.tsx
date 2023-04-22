import { Container } from "@chakra-ui/react";
//import Image from "next/image";
import React from "react";

import type { BlueCar } from "../../../../lib/types/components/games/carGame.types";

import blueCarStyles from "./styles/blueCar.module.scss";

/**
 * This component renders the Bluecar with animation in the car game
 * @param show is used to show or hide the car
 * @param blueCarLeft is used to update the left of bluecar
 * @param setBlueCarLeft is used to set the bluecar left value whenever it moves lanes
 * @param count is used to update the count when red car escapes bluecar
 * @param setCount is used to update the count in car game component
 * @returns Bluecar component
 */
const BlueCarComponent: React.FC<BlueCar> = ({
  show,
  blueCarLeft,
  setBlueCarLeft,
  count,
  setCount,
}) => {
  /**
   * This method is used to generate a random number based on which bluecar will be moved in different lanes
   * on each animation iteration
   */
  const onAnimationIteration = () => {
    const carlefts = [108, 198, 288, 378];
    const random = Math.floor(Math.random() * carlefts.length);
    setBlueCarLeft(carlefts[random]);
    setCount(count + 1);
  };

  /**
   * Returns the component only when show is true
   */
  if (show) {
    return (
      <Container
        id="blueCar"
        className="blueCar"
        onAnimationIteration={onAnimationIteration}
      >
        <img
          src="/images/blue.png"
          alt="BlueCar"
          width={50}
          height={100}
          className={blueCarStyles.blueCar}
          style={{ left: blueCarLeft }}
        />
      </Container>
    );
  }
  return <Container />;
};

// exporting the bluecar component
export default BlueCarComponent;

// import Image from "next/image";

import type { FoodProps } from "../../../../lib/types/components/games/snakeGame.types";

import snakeGameStyles from "./styles/snakeGame.module.scss";
import React from "react";

/**
 * This component is used to render the frog
 * @param coordinates where the frog needs to be rendered
 * @returns the frog randomly on the coordinates
 */
const Food: React.FC<FoodProps> = ({ coordinates }) => {
  const styleFood = {
    left: `${coordinates[0]}%`,
    top: `${coordinates[1]}%`,
  };
  return (
    <div className={snakeGameStyles.food} style={styleFood}>
      <img src="/images/frog.png" alt="Food" />
    </div>
  );
};

export default Food;

import React from "react";
import type { SnakeProps } from "../../../../lib/types/components/games/snakeGame.types";

import snakeGameStyles from "./styles/snakeGame.module.scss";

/**
 * This component is used to render snake on snake game board
 * @param SnakeCoordinates coordinates of the snake where it needs to moved
 * @returns snake
 */
const Snake: React.FC<SnakeProps> = ({ SnakeCoordinates }) => {
  return (
    <div>
      {SnakeCoordinates.map((dot, index) => {
        const indexVal = index + 1;
        const styleDot = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return (
          <div
            className={snakeGameStyles.snake}
            key={indexVal}
            style={styleDot}
          />
        );
      })}
    </div>
  );
};

export default Snake;

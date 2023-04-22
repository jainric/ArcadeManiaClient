import React from "react";

import ModalComponent from "../../../components/common/modal/Modal";
import type { ResultCardProps } from "../../../types/components/games/carGame.types";

/**
 * This component is used to render the results once the game is finished
 * @param score final score of the game
 * @param buttonAction to restart the game
 * @returns results card modal
 */
const ResultsCard: React.FC<ResultCardProps> = ({ score, buttonAction }) => {
  return (
    <ModalComponent
      modalHeader="Game Over"
      modalCotent={`Your score is ${score}`}
      actionButtonText="ReStart"
      buttonAction={buttonAction}
    />
  );
};

export default ResultsCard;

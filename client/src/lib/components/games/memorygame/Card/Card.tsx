import React from 'react';
// Types
import { CardType } from '../setup';
// Styles to be used
import { Wrapper, FrontImg, BackImg } from './Card.styles';
//using props
type Props = {
  card: CardType;
  callback: (card: CardType) => void;
};
//checking clicks with condition
const Card: React.FC<Props> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickable) callback(card);
  };
//wrapper to br returned here
  return (
    <Wrapper onClick={handleClick}>
      <FrontImg flipped={card.flipped} src={card.frontImage} alt='card-front' />
      <BackImg flipped={card.flipped} src={card.backImage} alt='card-back' />
    </Wrapper>
  );
};

export default Card;

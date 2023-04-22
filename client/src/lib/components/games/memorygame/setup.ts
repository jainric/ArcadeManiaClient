
export type CardType = {
  id: string;
  flipped: boolean;
  backImage: string;
  frontImage: string;
  clickable: boolean;
  matchingCardId: string;
};

// Putting the images in an array to render later
const cards: string[] = [
  "../img/card_1.jpg",
  "../img/card_2.jpg",
  "../img/card_3.jpg",
  "../img/card_4.jpg",
  "../img/card_5.jpg",
  "../img/card_6.jpg",
  "../img/card_7.jpg",
  "../img/card_8.jpg",
];
//exporting the images 
export const createBoard = () =>
  [...cards, ...cards].map((card, i) => ({
    id: `card${i}`,
    flipped: false,
    backImage: "../img/card_back.jpg",
    frontImage: card,
    clickable: true,
    matchingCardId:
      i < cards.length ? `card${i + cards.length}` : `card${i - cards.length}`,
  }));
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  perspective: 1000px;

  .front.flipped {
    z-index: 1;
    transform: rotateY(180deg);
  }
`;
//Adding props
type Props = {
  flipped: boolean;
};
//importing css to pass on
const sharedStyles = css`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
`;
//using trial condition to check flip
export const FrontImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${(props) => (props.flipped ? 2 : 1)};
  transform: ${(props) => (props.flipped ? "rotate(0deg)" : "rotateY(180deg)")};
`;

export const BackImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${(props) => (props.flipped ? 1 : 2)};
  transform: ${(props) =>
    props.flipped ? "rotateY(180deg)" : "rotate(360deg)"};
  position: absolute;
  top: 0px;
  left: 0px;
`;
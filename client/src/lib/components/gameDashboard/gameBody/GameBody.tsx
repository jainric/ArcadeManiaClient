import { Center, Container } from "@chakra-ui/react";

import type { ReactChildrenProps } from "../../../types/globals";
import React from "react";

/**
 * Game Dashboard Body Component.
 * @param ReactChildrenProps props
 * @returns GameBody.
 */
const GameBody: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <Container
      w="100%"
      h="100%"
      maxW="100%"
      maxH="100%"
      mt={0}
      centerContent
      overflow="hidden"
      rounded="xl"
      boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      justifyContent="center"
      alignItems="center"
    >
      <Center>{children}</Center>
    </Container>
  );
};

export default GameBody;

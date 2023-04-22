/* eslint-disable react-hooks/rules-of-hooks */
import { Heading, Stack, VStack, useColorModeValue } from "@chakra-ui/react";

import type { Score } from "../../../../lib/types/components/games/games.common";
import React from "react";

/**
 * Game Score Component that can be reused across the games.
 *
 * @param Score props
 * @returns GameScore
 */
const GameScore: React.FC<Score> = ({ score }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      mt={2}
      rounded="xl"
      width="full"
    >
      <VStack
        m={1}
        p={1}
        bg="green.400"
        color="white"
        rounded="xl"
        boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      >
        <Heading size="md">Score: {score}</Heading>
      </VStack>
    </Stack>
  );
};

export default GameScore;

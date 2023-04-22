import { Stack, VStack, Heading, Button } from "@chakra-ui/react";

import type { GameStatusMessageProps } from "../../../../lib/types/components/games/gamestatusmessage.types";
import React from "react";

/**
 * Game Status Message Component.
 * Reusable component to be used accross games.
 *
 * @param GameStatusMessageProps props
 * @returns GameStatusMessage
 */
const GameStatusMessage: React.FC<GameStatusMessageProps> = ({
  show,
  win,
  playAgain,
  score,
}) => {
  const message = `You ${win ? "win!" : "lose"}!`;
  return show ? (
    <Stack
      h="100%"
      w="100%"
      position="absolute"
      zIndex={10}
      justifyContent="center"
      transition="450ms filter linear"
    >
      <VStack
        bg="red"
        rounded="xl"
        m={{ sm: 4, md: 2, lg: 2 }}
        p={1}
        border="10px solid green"
      >
        <Heading size="xl">{message}</Heading>
        <Heading size="md">Score: {score}</Heading>
        <Button
          onClick={playAgain}
          type="button"
          bg="green.400"
          color="white"
          rounded="xl"
          boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
          _focus={{
            bg: "green.500",
          }}
          _hover={{
            bg: "green.500",
          }}
        >
          Play Again
        </Button>
      </VStack>
    </Stack>
  ) : null;
};

export default GameStatusMessage;

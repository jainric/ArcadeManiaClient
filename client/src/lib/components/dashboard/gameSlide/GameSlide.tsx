import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Stack,
    VStack,
    Image,
    Text,
  } from "@chakra-ui/react";
  //import { useRouter } from "next/router";
  import { useNavigate } from "react-router-dom";
  
  import type { GameInfoComponentProps } from "../../../../lib/types/components/common";
import React from "react";
  
  /**
   * GameSlide Component to be utilized by swiper in Dashboard.
   *
   * @param GameInfoComponentProps props
   * @returns GameSlide.
   */
  const GameSlide: React.FC<GameInfoComponentProps> = ({ game }) => {
    const router = useNavigate();
    return (
      <Box>
        <Center>
          <Stack w="75%">
            <HStack>
              <Image alt={game.name} src={game.image} h="30vh" />
              <VStack>
                <Flex>
                  <Text as="b" fontSize="4xl">
                    {game.name}
                  </Text>
                </Flex>
                <Flex>
                  <Text>{game.description}</Text>
                </Flex>
                <Button
                  color="white"
                  bg="blue.400"
                  _hover={{
                    bg: "blue.300",
                  }}
                  onClick={() => {
                    router(`game/${game.id}`);
                  }}
                >
                  Play Now!
                </Button>
              </VStack>
            </HStack>
          </Stack>
        </Center>
      </Box>
    );
  };
  
  export default GameSlide;
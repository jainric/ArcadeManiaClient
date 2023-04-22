import {
    Flex,
    GridItem,
    Box,
    Grid,
    Center,
    Button,
    HStack,
    Stack,
    VStack,
    Image,
    Text,
  } from "@chakra-ui/react";
  
  import { useNavigate } from "react-router-dom";
  
  
  import games from "../../../../lib/components/games";
  import type { GameInfoComponentProps } from "../../../../lib/types/components/common";
import React from "react";
  
  /**
   * Game Component where the Title, description and image are rendered.
   *
   * @param GameInfoComponentProps props
   * @returns Individual Game Component
   */
  const Game: React.FC<GameInfoComponentProps> = ({ game }) => {
    const navigate = useNavigate();
    return (
      <Box>
        <Center>
          <Stack w="75%">
            <VStack>
              <Text as="b" fontSize="4xl">
                {game.name}
              </Text>
              <HStack>
                <Image alt={game.name} src={game.image} h="32vh" maxW="16vw" />
                <VStack>
                  <Flex pl={3}>
                    <Text textAlign="center">{game.description}</Text>
                  </Flex>
                  <Button
                    color="white"
                    bg="blue.400"
                    _hover={{
                      bg: "blue.300",
                    }}
                    onClick={() => {
                      navigate(`/game/${game.id}`);
                    }}
                  >
                    Play Now!
                  </Button>
                </VStack>
              </HStack>
            </VStack>
          </Stack>
        </Center>
      </Box>
    );
  };
  
  /**
   * Dashboard List Component to render games in a list fashion.
   * @returns List of Games.
   */
  const DashboardList: React.FC = () => {
    return (
      <Box mt={10}>
        <Flex>
          <Text textAlign="left" fontSize="xl">
            All the games you can play!
          </Text>
        </Flex>
        <Grid my={2} h="38vh" w="80vw" templateColumns="repeat(2, 1fr)" gap={6}>
          {Object.entries(games).map(([id, game]) => {
            return (
              <GridItem w="38vw" colSpan={1} key={id} display="flex">
                <Flex>
                  <Center>
                    <Game game={game} />
                  </Center>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  export default DashboardList;
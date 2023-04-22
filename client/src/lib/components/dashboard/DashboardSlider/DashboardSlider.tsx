import {
    Grid,
    GridItem,
    Flex,
    Text,
    Box,
    Image,
    Center,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Button,
    Stack,
    VStack,
    Show,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  
  import type { SliderGameProps } from "../../../types/components/common";
  import games from "../../../../lib/components/games";
import React from "react";
  
  /**
   * Component to render each game to be rendered as featured games.
   *
   * @param SliderGameProps props
   * @returns SliderGameComponent.
   */
  const SliderGame: React.FC<SliderGameProps> = ({
    id,
    maxW,
    popoverPlacement,
  }) => {
    const game = games[id];
    const router = useNavigate();
    return (
      <Popover trigger="hover" placement={popoverPlacement}>
        <PopoverTrigger>
          <Center borderRadius="xl">
            <Image
              h={{ base: "38vh", md: "25vh", lg: "38vh" }}
              w={maxW}
              alt={game.name}
              src={game.altImage}
            />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Text as="b" fontSize="2xl">
              {game.name}
            </Text>
          </PopoverHeader>
          <PopoverBody>
            <Stack>
              <VStack>
                <Text>{game.description}</Text>
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
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };
  
  /**
   * Dashboard component to render featured games.
   * @returns DashboardSlider.
   */
  const DashboardSlider: React.FC = () => {
    return (
      <Box>
        <Flex>
          <Text textAlign="left" fontSize="xl">
            Featured Games :
          </Text>
        </Flex>
        <Grid
          my={2}
          h={{ base: "38vh", md: "25vh", lg: "38vh" }}
          w="80vw"
          templateColumns={{
            base: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          <GridItem colSpan={1} boxShadow="0 -4px 17px 2px rgb(72 187 120 / 43%)">
            <SliderGame id={1} maxH="38vh" maxW="full" popoverPlacement="right" />
          </GridItem>
          <GridItem colSpan={2} boxShadow="0 -4px 17px 2px rgb(72 187 120 / 43%)">
            <SliderGame id={3} maxH="38vh" maxW="full" popoverPlacement="top" />
          </GridItem>
          <Show above="lg">
            <GridItem
              colSpan={1}
              boxShadow="0 -4px 17px 2px rgb(72 187 120 / 43%)"
            >
              <SliderGame
                id={5}
                maxH="38vh"
                maxW="full"
                popoverPlacement="left"
              />
            </GridItem>
          </Show>
        </Grid>
      </Box>
    );
  };
  
  export default DashboardSlider;
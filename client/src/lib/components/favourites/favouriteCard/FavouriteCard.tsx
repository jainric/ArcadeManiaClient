import { useColorModeValue, Stack, Heading, Box, Image, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import type { GameInfo } from "../../../../lib/types/components/common";
import React from "react";

/**
 * Child component to render each Favourite game.
 *
 * @param GameInfo props
 * @returns FavouriteCard
 */
const FavouriteCard: React.FC<{ game: GameInfo }> = ({ game }) => {
  let gameImage = game.image;
  if (game.image && !game.image.startsWith("/")) {
    gameImage = `/${game.image}`;
  }
  const navigate = useNavigate();
  return (
    <Box
      role="group"
      p={6}
      maxW="330px"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      rounded="lg"
      pos="relative"
      zIndex={1}
    >
      <Box
        rounded="lg"
        mt={-12}
        pos="relative"
        height="230px"
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${gameImage})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          alt={game.name}
          src={gameImage}
          height={240}
          width={280}
          objectFit="contain"
        />
      </Box>
      <Stack pt={10} align="center">
        <Heading
          fontSize="3xl"
          fontFamily="body"
          fontWeight={500}
          id={`favCardButton${game.id}`}
        >
          {game.name}
        </Heading>
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
      </Stack>
    </Box>
  );
};

export default FavouriteCard;
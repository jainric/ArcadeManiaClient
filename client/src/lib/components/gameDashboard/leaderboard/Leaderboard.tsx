/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getLeaderboard as getLeaderboardService } from "../../../../lib/services/leaderboard-service";
import {
  getLeaderboard,
  setGameLeaderboard,
} from "../../../../lib/store/slices/leaderboardSlice";
import { useDispatch, useSelector } from "../../../../lib/store/store";
import type { GameInfoProps } from "../../../../lib/types/components/common";
import type { LeaderboardItemContainerProps } from "../../../../lib/types/components/leaderboard/leaderboard.types";

import LeaderboardItemContainer from "./leaderboardItem/LeaderboardItem";
import React from "react";

/**
 * Leaderboard Container.
 *
 * @param LeaderboardItemContainerProps
 * @returns LeaderboardElement
 */
const LeaderboardElement: React.FC<LeaderboardItemContainerProps> = ({
  users,
}) => {
  return (
    <Center>
      <Box
        maxW="445px"
        maxH="88vh"
        w="full"
        bg={useColorModeValue("gray.300", "gray.800")}
        rounded="md"
        p={{ base: "1", sm: "1", md: "2" }}
        overflow="scroll"
        boxShadow="0 5px 20px 0px rgb(72 187 120 / 43%)"
      >
        <Stack>
          <Heading
            color={useColorModeValue("blue.900", "white")}
            textTransform="uppercase"
            fontWeight={800}
            letterSpacing={1.1}
            fontSize="xl"
            fontFamily="body"
            p={{ base: "1", sm: "1", md: "2" }}
          >
            Top Players
          </Heading>
          {users && users.length > 0 ? (
            <LeaderboardItemContainer users={users} />
          ) : (
            <Center>
              <Text color={useColorModeValue("blue.900", "white")}>
                No Top Score
              </Text>
            </Center>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

/**
 * Spinner to show loader.
 *
 * @returns Loader
 */
const Loader: React.FC = () => {
  return (
    <Center alignItems="center" my="20" py="20">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

/**
 * Leaderboard entry point component.
 *
 * @param GameInfoProps props
 * @returns Leaderboard
 */
const Leaderboard: React.FC<GameInfoProps> = ({ id }) => {
  const dispatch = useDispatch();
  const leaderboard = useSelector(getLeaderboard)[id];

  const [isLoading, setIsLoading] = useState(true);

  const shouldShowLeaderboard = [4, 6, 7, 8, 9, 10, 11].indexOf(id) === -1;
  const shouldFetchLeaderboard = shouldShowLeaderboard && leaderboard == null;

  useEffect(() => {
    if (shouldFetchLeaderboard && !Number.isNaN(id)) {
      setIsLoading(true);
      getLeaderboardService(id).then((data) => {
        dispatch(setGameLeaderboard({ gameId: id, data }));
        setIsLoading(false);
      });
    }
  }, [dispatch, id, leaderboard, shouldFetchLeaderboard]);

  return (
    <div>
      {shouldShowLeaderboard && (isLoading ? <Loader /> : <LeaderboardElement users={leaderboard} />)}
    </div>
  );
};

export default Leaderboard;

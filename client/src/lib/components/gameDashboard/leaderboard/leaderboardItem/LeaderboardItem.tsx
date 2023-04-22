import {
    Box,
    Center,
    Text,
    Stack,
    Icon,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { RiTrophyFill } from "react-icons/ri";
  
  import GameAvatar from "../../../user/gameAvatar/GameAvatar";
  import type {
    LeaderboardItemContainerProps,
    LeaderboardItemData,
  } from "../../../../../lib/types/components/leaderboard/leaderboard.types";
  import { numberWithCommas } from "../../../../../lib/utils/numberUtils";
import React from "react";
  
  /**
   * Component to render each Leaderboard Item data.
   *
   * @param LeaderboardItemData Leaderboard Item.
   * @returns LeaderboardItem
   */
  const LeaderboardItem: React.FC<LeaderboardItemData> = ({
    userId,
    icon,
    index,
    name,
    score,
  }) => {
    return (
      <Center p={1}>
        <Text
          fontWeight={600}
          px="2"
          color={useColorModeValue("blue.900", "white")}
        >
          {(index ?? 0) + 1}
        </Text>
        <Box
          maxW="450px"
          w="full"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="2xl"
          rounded="full"
          px={3}
          overflow="hidden"
        >
          <Stack py={2} direction="row" justifyContent="space-between">
            <Stack direction="row" align="center">
              <GameAvatar userId={userId} name={name} icon={icon} />
              <Text fontWeight={600} color={useColorModeValue("black", "white")}>
                {name}
              </Text>
            </Stack>
            <Stack direction="row" spacing={2} fontSize="2xl" alignItems="center">
              {index === 0 ? (
                <Icon alignItems="center">
                  <RiTrophyFill color="#ffab20" />
                </Icon>
              ) : null}
              <Text color={useColorModeValue("pink.500", "pink.300")}>
                {numberWithCommas(score)}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  };
  
  /**
   * Container for all Leaderboard Items.
   *
   * @param LeaderboardItemContainerProps props
   * @returns LeaderboardItemContainer
   */
  const LeaderboardItemContainer: React.FC<LeaderboardItemContainerProps> = ({
    users,
  }) => {
    return (
      <>
        {users.map((e: LeaderboardItemData, i: number) => {
          const key = `${e.userId}~${i}`;
          return (
            <LeaderboardItem
              icon={e.icon}
              userId={e.userId}
              index={i}
              name={e.name}
              score={e.score}
              key={key}
            />
          );
        })}
      </>
    );
  };
  
  export default LeaderboardItemContainer;
  

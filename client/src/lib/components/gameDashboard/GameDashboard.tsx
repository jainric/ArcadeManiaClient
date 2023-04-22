import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect } from "react";

import type { GameInfoProps } from "../../types/components/common";
import games from "../games";
import { saveUserPreferences } from "../../../lib/services/user-preference-service";
import { getAuthState } from "../../../lib/store/slices/authSlice";
import {
  getUserPreferences,
  setUserPreferenceRecentlyPlayed,
} from "../../../lib/store/slices/userPreferencesSlice";
import { useDispatch, useSelector } from "../../../lib/store/store";
import { isAuthenticated } from "../../../lib/utils/tokenUtils";

import GameBody from "./gameBody/GameBody";
import GameHeader from "./gameHeader/gameHeader";
import Leaderboard from "./leaderboard/Leaderboard";
import React from "react";

/**
 * Game Dashboard.
 *
 * @param GameInfoProps props
 * @returns GameDashboard
 */
const GameDashboard: React.FC<GameInfoProps> = ({ id }) => {
  const game = games[id];
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const { theme, recentlyPlayed } = useSelector(getUserPreferences);

  useEffect(() => {
    if (game !== null && isAuthenticated(authState)) {
      const cloned: number[] = structuredClone(recentlyPlayed || []);
      const index = cloned.indexOf(game.id);
      if (index !== -1) {
        cloned.splice(index, 1);
      }
      cloned.unshift(game.id);
      saveUserPreferences(theme, cloned).then(() => {
        dispatch(setUserPreferenceRecentlyPlayed(cloned));
      });
    }
  }, [authState, dispatch, game]);

  return (
    <Box p={2}>
      <Grid
        templateAreas={`
                  "header leaderboard"
                  "main leaderboard"`}
        gridTemplateRows={{
          base: "1fr",
          md: "1fr",
        }}
        gridTemplateColumns={{
          base: "100%",
          md: "2.4fr 1fr",
        }}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl={2} area="header">
          <GameHeader helpContent={game?.helpContent} gameInfo={game} />
        </GridItem>
        <GridItem pl={2} area="main">
          <GameBody>{game?.component}</GameBody>
        </GridItem>
        <Show above="md">
          <GridItem pl={1} area="leaderboard">
            <Leaderboard id={id} />
          </GridItem>
        </Show>
      </Grid>
    </Box>
  );
};

export default GameDashboard;

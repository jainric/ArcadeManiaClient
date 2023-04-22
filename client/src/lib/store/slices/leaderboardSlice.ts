import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { LeaderboardItemData } from "../../types/components/leaderboard/leaderboard.types";

export type LeaderboardState = {
  [id: number]: LeaderboardItemData[];
};

export type LeaderboardGameState = {
  gameId: number;
  data: LeaderboardItemData[];
};

/**
 * Default state object with initial values.
 */
const initialState: LeaderboardState = {};

/**
 * Leaderboard slice with reducer containing actions.
 */
export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setGameLeaderboard: (
      state: Draft<LeaderboardState>,
      action: PayloadAction<LeaderboardGameState>
    ) => {
      state[action.payload.gameId] = action.payload.data;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getLeaderboard = (state: { leaderboard: LeaderboardState }) =>
  state.leaderboard;

// Exports all actions
export const { setGameLeaderboard } = leaderboardSlice.actions;

export const leaderboardSliceReducer = leaderboardSlice.reducer;

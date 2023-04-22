import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { UserPreference } from "../../types/components/common";

/**
 * Default state object with initial values.
 */
const initialState: UserPreference = {
  recentlyPlayed: [],
  theme: "dark",
};

/**
 * UserPreferences slice with reducer containing actions.
 */
export const userPreferences = createSlice({
  name: "UserPreferences",
  initialState,
  reducers: {
    fetchUserPreference: (
      state: Draft<UserPreference>,
      action: PayloadAction<UserPreference>
    ) => {
      return action.payload;
    },
    setUserPreferenceTheme: (
      state: Draft<UserPreference>,
      action: PayloadAction<{ theme: "light" | "dark" }>
    ) => {
      state.theme = action.payload.theme;
    },
    setUserPreferenceRecentlyPlayed: (
      state: Draft<UserPreference>,
      action: PayloadAction<number[]>
    ) => {
      state.recentlyPlayed = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserPreferences = (state: {
  userPreferences: UserPreference;
}) => state.userPreferences;

// Exports all actions
export const {
  fetchUserPreference,
  setUserPreferenceTheme,
  setUserPreferenceRecentlyPlayed,
} = userPreferences.actions;

export const userPreferencesSliceReducer = userPreferences.reducer;

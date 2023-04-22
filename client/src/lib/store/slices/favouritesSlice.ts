import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type {
  FavouritesState,
  GameFavourites,
} from "../../types/components/common";

/**
 * Default state object with initial values.
 */
const initialState: FavouritesState = {
  favourites: [],
};

/**
 * Favourites slice with reducer containing actions.
 */
export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourite: (
      state: Draft<FavouritesState>,
      action: PayloadAction<GameFavourites[]>
    ) => {
      action.payload.forEach((e:any) => state.favourites.push(e));
    },
    resetFavourite: (
      state: Draft<FavouritesState>,
      action: PayloadAction<GameFavourites[]>
    ) => {
      const removedGames: GameFavourites[] = action.payload || [];
      const rgSet = new Set(removedGames.map((e:any) => e.gameId));
      const newTodos = state.favourites.filter((e:any) => !rgSet.has(e.gameId));
      state.favourites = newTodos;
    },
    clearFavourite: (
      state: Draft<FavouritesState>,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<GameFavourites[]>
    ) => {
      state.favourites = [];
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites;

// Exports all actions
export const { setFavourite, resetFavourite, clearFavourite } =
  favouritesSlice.actions;

export const favouritesSliceReducer = favouritesSlice.reducer;

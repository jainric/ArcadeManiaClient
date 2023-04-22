import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import { authSliceReducer } from "./slices/authSlice";
import { favouritesSliceReducer } from "./slices/favouritesSlice";
import { leaderboardSliceReducer } from "./slices/leaderboardSlice";
import { userPreferencesSliceReducer } from "./slices/userPreferencesSlice";

/**
 * Configuring Redux Store.
 */
const store = configureStore({
  reducer: {
    leaderboard: leaderboardSliceReducer,
    auth: authSliceReducer,
    favourites: favouritesSliceReducer,
    userPreferences: userPreferencesSliceReducer,
  },
  devTools: true,
});

const makeStore = () => store;

/**
 * Helper Types.
 */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);

export default store;
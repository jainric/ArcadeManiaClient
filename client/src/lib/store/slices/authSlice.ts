import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "../../types/components/auth.types";

/**
 * Default state object with initial values.
 */
const initialState: AuthState = { token: "" };

/**
 * Auth slice with reducer containing actions.
 */
export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken: (
      state: Draft<AuthState>,
      action: PayloadAction<AuthState>
    ) => {
      state.token = action.payload.token;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getAuthState = (state: { auth: AuthState }) => state.auth;

// Exports all actions
export const { setAccessToken } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;

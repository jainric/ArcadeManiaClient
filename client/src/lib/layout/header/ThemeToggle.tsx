import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "../../store/store";
// import * as userPreferencesService from "lib/services/user-preference-service";
import * as userPreferencesService from "../../../lib/services/user-preference-service";
import { getAuthState } from "../../../lib/store/slices/authSlice";
import {
  getUserPreferences,
  setUserPreferenceTheme,
} from "../../../lib/store/slices/userPreferencesSlice";
import { isAuthenticated } from "../../../lib/utils/tokenUtils";
import React from "react";

/**
 * Theme toggling Component.
 *
 * @returns ThemeToggle Button.
 */
const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const authState = useSelector(getAuthState);
  const userPreferenceState = useSelector(getUserPreferences);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated(authState) && userPreferenceState.theme !== colorMode) {
      userPreferencesService
        .saveUserPreferences(colorMode, userPreferenceState.recentlyPlayed)
        .then(() => {
          dispatch(
            setUserPreferenceTheme({
              theme: colorMode,
            })
          );
        });
    }
  }, [authState, colorMode, dispatch, userPreferenceState.recentlyPlayed]);

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;

import { raiseError } from "../../utils/toastUtils";
import axios from "../../../lib/config/axios.config";
 import { API_URL } from "../../../lib/config/config";
import type { UserPreference } from "../../../lib/types/components/common";

const defaultPreferences: UserPreference = {
  theme: "dark",
  recentlyPlayed: [],
};

/**
 * Gets the User Preferences for logged in user.
 *
 * @returns User Preferences.
 */
export const getUserPreferences = () => {
  const url = `${API_URL}userpreferences`;
  return axios
    .get<UserPreference>(url)
    .then((response) => response.data || defaultPreferences)
    .catch((error) => {
      // raiseError(error);
      return defaultPreferences;
    });
};

/**
 * Save the score for current user.
 *
 * @returns Saved score response.
 */
export const saveUserPreferences = (
  theme: string,
  recentlyPlayed: number[]
) => {
  return axios
    .post<UserPreference>(`${API_URL}userpreferences`, {
      theme,
      recentlyPlayed,
    })
    .then((response) => response.data || defaultPreferences)
    .catch((error) => {
      // raiseError(error);
      return defaultPreferences;
    });
};

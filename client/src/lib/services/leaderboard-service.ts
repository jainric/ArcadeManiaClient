import { raiseError } from "../utils/toastUtils";
import axios from "../config/axios.config";
import { API_URL } from "../config/config";
import type {
  LeaderboardItemData,
  SaveScoreResponse,
} from "../types/components/leaderboard/leaderboard.types";

/**
 * Gets the leaderboard for the given game.
 *
 * @param id game id.
 * @returns List of Leaderboard data.
 */
export const getLeaderboard = async (id: number) => {
  const url = `${API_URL}leaderboard/${id}`;
  return axios
    .get<LeaderboardItemData[]>(url)
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      const data: LeaderboardItemData[] = [];
      return data;
    });
};

/**
 * Save the score for current user.
 * @param gameId Game Id
 * @param score score
 * @returns Saved score response.
 */
export const saveScore = async (gameId: number, score: number) => {
  return axios
    .post<SaveScoreResponse>(`${API_URL}leaderboard/${gameId}`, {
      score,
    })
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return [];
    });
};

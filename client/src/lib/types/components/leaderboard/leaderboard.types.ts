import type { UserInfo } from "../common";

/**
 * Leaderboard Item Data.
 */
export type LeaderboardItemData = UserInfo & {
  index?: number;
  score: number;
};

/**
 * Score Data.
 */
export type ScoreData = {
  id: number;
  gameId: number;
  userId: number;
  score: number;
};

/**
 * Leaderboard Item Container Props.
 */
export type LeaderboardItemContainerProps = {
  users: LeaderboardItemData[];
};

/**
 * Save Score Response.
 */
export type SaveScoreResponse = {
  score: ScoreData;
};

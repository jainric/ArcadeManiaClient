import type { AuthState } from "../../lib/types/components/auth.types";

const AUTH_TOKEN = "AUTH_TOKEN";

/**
 * Utility method to parse JWT Token and get payload information
 *
 * @param token JWT Token
 * @param property Property to retrieve from JWT Payload
 * @returns value
 */
export const parseJwtAndGet = (token: string, property = "id") => {
  if (!token) return undefined;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64))[property];
};

/**
 * Utility to check if the token is valid
 *
 * @param state Auth State
 * @returns true, if the token is valid
 */
export const isAuthenticated = (state: AuthState) => {
  return state && state.token && state.token !== "";
};

/**
 * Utility method to get Auth Token from localStorage
 *
 * @returns AuthToken if exists else empty
 */
export const getSessionStorageToken = (): string => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem(AUTH_TOKEN) || ""
    : "";
};

/**
 * Utility method to set Auth Token in localStorage
 *
 * @param token AuthToken to set.
 */
export const setSessionStorageToken = (token: string) => {
  if (typeof window !== "undefined")
    window.localStorage.setItem(AUTH_TOKEN, token);
};

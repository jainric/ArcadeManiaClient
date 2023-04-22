import axios from "axios";

/**
 * Helper method to set Authorization token in the axios defaults.
 *
 * @param token Authorization header token.
 */
export const setAxiosAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `bearer ${token}`;
};

export default axios;

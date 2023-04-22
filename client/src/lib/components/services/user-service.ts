// import { API_URL } from "../config/config";
import { API_URL } from "../../../lib/config/config";

const defaultContentType = "application/json";

/**
 * This function is update the user details to database
 * @returns the response of the update user api (updated user details)
 */
export const updateUser = async (token: string, data: JSON) => {
  const newurl = `${API_URL}user/updateProfile`;
  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

/**
 * This function is used to get the user details
 * @returns the response of the getuser api (user details)
 */
export const getUser = async (token: string) => {
  const newurl = `${API_URL}user/getUser`;

  return fetch(newurl, {
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
      authorization: `Bearer ${token}`,
    },
  });
};

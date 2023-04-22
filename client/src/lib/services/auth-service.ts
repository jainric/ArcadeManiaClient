import { API_URL } from "../config/config";

const defaultContentType = "application/json";

/**
 * This function is used to signin the user
 * @returns the response of the login api (user details with accesstoken)
 */
export const signIn = async (data: JSON) => {
  const newurl = `${API_URL}auth/signin`;

  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
    },
    body: JSON.stringify(data),
  });
};

/**
 * This function is used to signup the user and save the user details to database
 * @returns the response of the signup api (created user details)
 */
export const createUser = async (data: JSON) => {
  const newurl = `${API_URL}auth/signup`;

  return fetch(newurl, {
    method: "POST",
    headers: {
      "cache-control": "no-cache",
      "content-type": defaultContentType,
    },
    body: JSON.stringify(data),
  });
};

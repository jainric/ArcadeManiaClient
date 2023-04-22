// import axios from "lib/config/axios.config";
// import { API_URL } from "../config/config";
import { API_URL } from "../../../lib/config/config";
import axios from "../../../lib/config/axios.config";
import type { GameFavourites } from "../../../lib/types/components/common";
import { raiseError } from "../../../lib/utils/toastUtils";

/**
 * Updates the favourite game for the given user.
 *
 * @param id Game Id
 * @param isFavourite Set or reset favourite
 * @returns Array of games set as favourite.
 */
export const updateFavourite = (
  id: number,
  isFavourite = true
): Promise<GameFavourites[]> => {
  const url = `${API_URL}favourites/${id}`;
  const promise = isFavourite
    ? axios.post<GameFavourites[]>(url)
    : axios.delete<GameFavourites[]>(url);
  return promise
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return [] as GameFavourites[];
    });
};

/**
 * Gets the favourites for the current user.
 *
 * @returns Array of games set as favourite.
 */
export const fetchFavourites = () => {
  const url = `${API_URL}favourites`;
  return axios
    .get<GameFavourites[]>(url)
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return [] as GameFavourites[];
    });
};

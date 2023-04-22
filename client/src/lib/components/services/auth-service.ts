import { API_URL } from "../../../lib/config/config";
import { useNavigate } from 'react-router-dom';
const history = useNavigate();
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


// export const signIn = async (data: JSON) => {
//   const newurl = `${API_URL}auth/signin`;
//   return fetch(newurl, {
//     method: "POST",
//     headers: {
//       "cache-control": "no-cache",
//       "content-type": defaultContentType,
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error('Network response was not ok.');
//   })
//   .then(data => {
//     if (data.username === 'muskansri1') {
//       history('/game/5');
//     } else {
//       // do something else
//     }
//   })
//   .catch(error => {
//     console.error('There was an error!', error);
//   });
// };



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

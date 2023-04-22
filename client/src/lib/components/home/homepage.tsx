import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/slices/authSlice";
import { showSuccess } from "../../utils/toastUtils";
import Dashboard from "../dashboard/Dashboard";
import { setAxiosAuthHeader } from "../../config/axios.config";
import { setSessionStorageToken } from "../../utils/tokenUtils";

/**
 * Home entry point component.
 *
 * @returns Home
 */
const HomePage = () => {
  const history = useNavigate();
  const accessToken: string = new URLSearchParams(window.location.search).get('token') || '';
  const dispatch = useDispatch();
//   useEffect(() => {
//     if (accessToken) {
//       setAxiosAuthHeader(accessToken);
//       setSessionStorageToken(accessToken);
//       dispatch(setAccessToken({ token: accessToken }));
//       history('/');
//       showSuccess("User logged In Successfully");
//     }
//   }, [accessToken, dispatch, history]);

  return (
    <>
        <title>Home</title>
      {/* <Dashboard /> */}
    </>
  );
};

export default HomePage;

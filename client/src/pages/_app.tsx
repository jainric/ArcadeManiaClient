import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Layout from "../lib/layout";
import store from "../lib/store/store";
import "../lib/styles/globals.scss";
import "swiper/css/bundle";
import ErrorPage404 from '../lib/components/404/ErrorPage404';
import Home from '../lib/components/home/Home';
import Game from '../pages/game/[gameid]';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../lib/layout";
import Myprofile from "./profile/myProfile";
import Favourites from "../lib/components/favourites/Favourites";
import AdminDashboard from "../pages/profile/AdminDashboard";
import MyProfileAdminUpdate from "./profile/myProfile2";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ChakraProvider>
      <Provider store={store}>
      <Router>
      <Layout> 
        <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/game/:gameid" element={<Game />} />
        <Route path='main' element={<ErrorPage404 />}></Route>
        <Route path="/profile/myProfile" element={<Myprofile />} />
        <Route path="/profile/favourites" element={<Favourites />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/profile/myProfile2" element={<MyProfileAdminUpdate />} />

        </Routes>
        </Layout>
      </Router>
    </Provider>
    </ChakraProvider>
    );
  };



export default MyApp;
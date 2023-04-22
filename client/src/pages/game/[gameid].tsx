
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import ErrorPage404 from "../../lib/components/404/ErrorPage404";
// import GameDashboard from "../../lib/components/gameDashboard/GameDashboard";
// import { isValidGameId } from "../../lib/components/games";
// import React from "react";

// /**
//  * React component to render Games.
//  *
//  * @returns Game Dashboard.
//  */
// const GamePage = () => {

//   const { gameid } = useParams();
//   const id = parseInt(gameid as string, 10);
//   const [isValidId, setIsValidId] = useState(false);

//   useEffect(() => {
//     setIsValidId(isValidGameId(id));
//   }, [id]);

//   return isValidId ? <GameDashboard id={id} /> : <ErrorPage404 />;
// };

// export default GamePage

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ErrorPage404 from "../../lib/components/404/ErrorPage404";
import GameDashboard from "../../lib/components/gameDashboard/GameDashboard";
import { isValidGameId } from "../../lib/components/games";
import React from "react";

/**
 * React component to render Games.
 *
 * @returns Game Dashboard.
 */
const GamePage = () => {
  const { gameid } = useParams();
  const id = parseInt(gameid as string, 10);
  const [isValidId, setIsValidId] = useState(false);

  useEffect(() => {
    setIsValidId(isValidGameId(id));
  }, [id]);

  return isValidId ? <GameDashboard id={id} /> : <ErrorPage404 />;
};

export default GamePage;

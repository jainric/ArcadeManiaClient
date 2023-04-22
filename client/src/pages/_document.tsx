import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { renderToString } from "react-dom/server";

import customTheme from "../lib/styles/theme";

const MyDocument = () => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ColorModeScript
          initialColorMode={customTheme.config?.initialColorMode}
        />
        <div id="root"></div>
      </body>
    </html>
  );
};

const html = renderToString(<MyDocument />);
console.log(html);
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../../../lib/styles/theme";
import React from "react";

interface ChakraProps {
  children: React.ReactNode;
}

/**
 * Chakra Provider component to bind Chakra UI to NextJs Application
 *
 * @param ChakraProps props
 * @returns ChakraProvider
 */
export const Chakra = ({ children }: ChakraProps) => {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
};

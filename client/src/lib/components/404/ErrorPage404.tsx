import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 *  404 Error Page component rendered on invalid paths accessed in the application.
 *
 * @returns 404 Page component.
 */
const ErrorPage404 = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
        <title>404 Not Found</title>

      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Page not Found.
        </Heading>

        <Box textAlign="center" marginTop={4}>
          <Text fontSize="sm" color="gray">
            It&apos;s Okay!
          </Text>
          <Button
            as={Link}
            to="/"
            backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            size="lg"
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ErrorPage404;
